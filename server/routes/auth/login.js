const {details} = require('sandhands')
const httpAuth = require('express-http-auth')
const bcrypt = require('bcrypt')

function login(router, {models, functions}) {
  const {getSession} = functions
  const {User} = models
  router.get('/login', httpAuth.realm(null), (req, res, next) => {
    const {username, password} = req
    const authErrors = details([username, password], ['username', 'password'])
    if (authErrors !== null) return res.status(400).json(authErrors)
    User.findOne({username}, (err, user) => {
      if (err) return next(err)
      if (!user) return res.sendStatus(401)

      const {hash} = user
      bcrypt.compare(password, hash, (err, valid) => {
        if (err) return next(err)
        if (valid !== true) return res.sendStatus(401)
        getSession(username, (err, token) => {
          if (err) return next(err)
          res.cookie('username', username, {sameSite: true})
          res.cookie('session', token, {httpOnly: true, sameSite: true})
          res.sendStatus(200)
        })
      })
    })

  })
}

module.exports = login
