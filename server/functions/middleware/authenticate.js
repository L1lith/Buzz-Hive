const {details} = require('sandhands')

function authenticate(data) {
  const {Session, User} = data.models
  return (options={}) => {
    const {getUser=false} = options
    return (req, res, next) => {
      const reqError = details(req.cookies, {_: {username: 'username', session: String}, strict: false})
      if (reqError !== null) return res.status(400).json({cookies: reqError})

      Session.findOne({owner: req.cookies.username, _id: req.cookies.token}, (err, session) => {
        if (err) return next(err)
        if (!session) return res.sendStatus(401)
        req.session = session
        req.token = session._id
        if (getUser === false) return next()
        User.findOne({username: cookies.username}, (err, user) => {
          if (err) return next(err)
          req.user = user
          next()
        })
      })
    }
  }
}

module.exports = authenticate
