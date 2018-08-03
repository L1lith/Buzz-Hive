const {sandhandsExpress} = require('sandhands')
const basicAuth = require('express-basic-auth')

function login(router, {models}) {
  router.get('/login', sandhandsExpress({
    username: 'username',
    password: 'password'
  }))
  router.get('/login', basicAuth({authorizer: (username, password) => {

  }}))
  router.get('/login', (req, res) => {
    console.log(req.body)
  })
}

module.exports = login
