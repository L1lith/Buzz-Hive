const {details} = require('sandhands')

function authenticate(data) {
  const {Session, User} = data.models
  return (options={}) => {
    const {getUser=false, requireVerification=true} = options
    return (req, res, next) => {
      const reqError = details(req.cookies, {_: {username: 'username', session: String}, strict: false})
      if (reqError !== null) return res.status(400).json({cookies: reqError})

      Session.findOne({owner: req.cookies.username, id: req.cookies.token}, (err, session) => {
        if (err) return next(err)
        if (!session) return res.sendStatus(401)
        req.session = session
        req.token = session._id
        if (getUser !== true && requireVerification !== true) return next()
        User.findOne({username: req.cookies.username}, (err, user) => {
          if (err) return next(err)
          req.user = user
          if (requireVerification === true && user.verified !== true) return res.status(401).send('Email Verification Required')
          next()
        })
      })
    }
  }
}

module.exports = authenticate
