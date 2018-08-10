const {sandhandsExpress} = require('sandhands')

function validDevice(router, {middleware}) {
  router.post('/valid', sandhandsExpress({
    pushURL: String
  }), middleware.authenticate({getUser: true}), middleware.getDevices({singleDevice: true}), (req, res) => {
    console.log('req url',req.body.pushURL, '\n device url', req.device.pushURL)
    console.log('matched:', req.body.pushURL === req.device.pushURL)
    if (req.body.pushURL === req.device.pushURL) {
      res.sendStatus(200)
    } else {
      res.sendStatus(409)
    }
  })
}

module.exports = validDevice
