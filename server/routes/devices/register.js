const UAParser = require('ua-parser-js')

function registerDevice(router, {middleware, functions, models}) {
  const {Device} = models
  const {validatePushURL} = functions
  router.post('/register',
    middleware.authenticate({getUser: true}),
    middleware.pushSubscriptionBody,
      (req, res, next) => {

    const {endpoint} = req.body
    const pushURLError = validatePushURL(endpoint)
    if (pushURLError) return res.status(400).send(pushURLError)
    let deviceName = null
    if (req.headers['user-agent']) {
      const UA = new UAParser(req.headers['user-agent'])
      deviceName = `${UA.getOS().name || "Unknown OS"}-${UA.getBrowser().name || "Unknown Browser"}-${Math.random().toString().substring(2,6)}`
    } else {
      deviceName = "Unknown Device "+Math.random().toString().substring(2,6)
    }
    const device = new Device({owner: req.user.username, name: deviceName, subscription: req.body})
    device.save(err => {
      if (err) return next(err)
      res.json({name: deviceName, id: device._id})
    })
  })
}

module.exports = registerDevice
