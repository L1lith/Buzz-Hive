const {sandhandsExpress} = require('sandhands')

function signup(router, {models}) {
  const {User} = models
  router.post('/signup', sandhandsExpress({
    username: 'username',
    password: 'password',
    email: 'email'
  }), (req, res, next) => {
    const user = new User(req.body)
    user.save(err => {
      if (err) return next(err)
      res.sendStatus()
    })
  })
}

module.exports = signup
