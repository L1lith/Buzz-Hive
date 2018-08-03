const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const createModels = require('./models')

const port = 8050

async function createServer() {
  const server = express()
  const models = await createModels()
  server.use(bodyParser.json())
  await router(server, {models})
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
