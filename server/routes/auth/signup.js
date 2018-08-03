const {sandhandsExpress} = require('sandhands')
const bcrypt = require('bcrypt')
const getSession = require('../../functions/getSession')

function signup(router, {models}) {
  const {User} = models
  router.post('/signup', sandhandsExpress({
    username: 'username',
    password: 'password',
    email: 'email'
  }), (req, res, next) => {
    const {username, password, email} = req.body

    bcrypt.hash(password, 12, (err, hash) => {
      if (err) return next(err)
      const user = new User({username, password, hash, email})
      user.save(err => {
        if (err) return next(err)
        getSession(username, models, (err, token) => {
          if (err) return next(err)
          res.cookie('username', username, {httpOnly: true})
          res.cookie('session', token, {httpOnly: true})
          res.sendStatus(200)
        })
      })
    })
  })
}

module.exports = signup
