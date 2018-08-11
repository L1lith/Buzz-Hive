const {sandhandsExpress} = require('sandhands')
const equal = require('deep-equal')

function validDevice(router, {middleware}) {
  router.post('/valid', sandhandsExpress({
    endpoint: String,
    keys: {
      auth: String,
      p256dh: String
    }
  }), middleware.authenticate({getUser: true}), middleware.getDevices({singleDevice: true}), (req, res) => {
    if (equal(req.body, req.device)) {
      res.sendStatus(200)
    } else {
      res.sendStatus(409)
    }
  })
}

module.exports = validDevice
