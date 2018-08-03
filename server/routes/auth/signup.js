const {sandhandsExpress} = require('sandhands')
const bcrypt = require('bcrypt')

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
        res.sendStatus(200)
      })
    })
  })
}

module.exports = signup
