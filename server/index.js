const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')

const port = 8050

async function createServer() {
  const server = express()
  server.use(bodyParser.json())
  await router(server)
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
