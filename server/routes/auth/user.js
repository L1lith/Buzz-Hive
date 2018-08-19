const {sandhandsExpress} = require('sandhands')

function user(router, {middleware}) {
  router.patch('/user', middleware.authenticate({getUser: true}), sandhandsExpress({
    name: {_: 'displayName', optional: true}
  }), (req, res, next) => {
    if (Object.keys(req.body).length < 1) return res.sendStatus(400)
    if (req.body.hasOwnProperty('name')) {
      req.user.displayName = req.body.name
    }
    req.user.save(err => {
      if (err) return next(err)
      res.sendStatus(200)
    })
  })
}

module.exports = user
