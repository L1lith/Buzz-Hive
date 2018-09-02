const equal = require('deep-equal')

function validDevice(router, {middleware}) {
  router.post('/valid',
    middleware.pushSubscriptionBody(false),
    middleware.authenticate({getUser: true}),
    middleware.getDevices({singleDevice: true}),
      (req, res) => {
    if (equal(req.body, req.device.subscription)) {
      res.sendStatus(200)
    } else {
      res.sendStatus(409)
    }
  })
}

module.exports = validDevice
