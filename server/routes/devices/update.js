const {sandhandsExpress} = require('sandhands')

function updateDevice(router, {functions, middleware}) {
  const {validPushURL} = functions
  router.patch('/update', middleware.authenticate({getUser: true}), sandhandsExpress({
    pushURL: {_: String, optional: true},
    deviceName: {_: String, optional: true}
  }), middleware.getDevices({singleDevice: true}), (req, res) => {
    const {device} = req

    if (req.body.hasOwnProperty('deviceName')) device.name = req.body.deviceName
    if (req.body.hasOwnProperty('pushURL')) {
      if (!validPushURL(req.body.pushURL)) return res.sendStatus(400)
      device.pushURL = req.body.pushURL
    }
    device.save(err => {
      if (err) return next(err)
      res.sendStatus(200)
    })
  })
}

module.exports = updateDevice
