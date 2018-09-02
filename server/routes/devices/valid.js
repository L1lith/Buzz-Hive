const equal = require('deep-equal')

function validDevice(router, {middleware}) {
  router.post('/valid',
    middleware.pushSubscriptionBody(false),
    middleware.authenticate({getUser: true}),
    middleware.getDevices({singleDevice: true}),
      (req, res) => {
    if (equal(req.body.subscription, req.device.subscription)) {
      res.status(200).json({name: req.device.name})
    } else {
      res.sendStatus(409)
    }
  })
}

module.exports = validDevice
