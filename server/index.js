const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const requireDirectory = require('require-directory')
const helmet = require('helmet')
const setupRoutes = require('./routes')
const createModels = require('./models')
const getFunctions = require('./functions')
const runScripts = require('./scripts')
const {resolve} = require('path')
const merge = require('merge-objects')

const port = require('./config.json').port || 8040

async function createServer() {
  const server = express()
  let data = await runScripts('launch')
  // Configure server
  server.enable('trust proxy')

  // Prepare Server
  data.models = await createModels()
  data = merge(data, {functions: await getFunctions(data)})
  data = merge(data, {middleware: data.functions.middleware || {}})

  // Setup Middleware
  server.use(helmet())
  server.use(bodyParser.json())
  server.use(cookieParser())

  if (process.env.NODE_ENV !== 'production') {
    server.use(express.static(resolve(__dirname, '../worker/dist')))
    server.use(express.static(resolve(__dirname, '../client/dist')))
    server.use(express.static(resolve(__dirname, '../client/static')))
  }


  // Run Router
  server.use(await setupRoutes(data))
  return server
}

if (require.main === module) (async ()=>{
  console.log('Creating Server')
  const server = await createServer()
  console.log('Starting Server')
  server.listen(port, err => {
    if (err) return console.log(err)
    console.log(`Server Listening on Port ${port}`)
  })
})().then(()=>{}).catch(console.log)

module.exports = createServer
