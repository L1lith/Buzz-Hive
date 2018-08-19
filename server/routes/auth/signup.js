const {sandhandsExpress} = require('sandhands')
const bcrypt = require('bcrypt')

function signup(router, {models, functions}) {
  const {getSession} = functions
  const {User} = models
  router.post('/signup', sandhandsExpress({
    username: 'username',
    password: 'password',
    email: 'email',
    displayName: 'displayName'
  }), (req, res, next) => {
    let {username, password, email, displayName} = req.body
    displayName = displayName || username

    bcrypt.hash(password, 12, (err, hash) => {
      if (err) return next(err)
      const user = new User({username, password, hash, email})
      user.save(err => {
        if (err) return next(err)
        getSession(username, (err, token) => {
          if (err) return next(err)
          res.cookie('username', username, {httpOnly: true, sameSite: true})
          res.cookie('session', token, {httpOnly: true, sameSite: true})
          res.status(200).json({username})
        })
      })
    })
  })
}

module.exports = signup
