const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const requireDirectory = require('require-directory')
const router = require('./router')
const createModels = require('./models')
const getFunctions = require('./functions')

const port = require('./config').port || 8040

async function createServer() {
  const server = express()
  const data = {}
  data.models = await createModels()
  data.functions = await getFunctions(data)
  server.use(bodyParser.json())
  server.use(cookieParser())
  await router(server, data)
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
