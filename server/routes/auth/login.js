const {details} = require('sandhands')
const httpAuth = require('express-http-auth')

function login(router, {models}) {
  const {User} = models
  router.get('/login', httpAuth.realm('Authentication'), (req, res) => {
    const {username, password} = req
    const authErrors = details([username, password], ['username', 'password'])
    if (authErrors !== null) return res.status(400).json(authErrors)
    User.findOne({username}, (err, user) => {
      if (err) return res.status(500).send('Internal Error')
      if (!user) return res.sendStatus(401)

      console.log(user)
    })

  })
}

module.exports = login
