const {sandhandsExpress} = require('sandhands')

function login(router) {
  router.get('/login', sandhandsExpress({
    username: 'username',
    password: 'password'
  }))
  router.get('/login', (req, res) => {
    console.log(req.body)
  })
}

module.exports = login
