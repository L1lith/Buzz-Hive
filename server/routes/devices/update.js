const {sandhandsExpress} = require('sandhands')

function updateDevice(router, {middleware}) {
  router.patch('/update', middleware.authenticate({getUser: true}), sandhandsExpress({
    pushURL: {_: String, optional: true},
    deviceName: {_: String, optional: true},
    newDeviceName: {_: String, optional: true}
  }), (req, res) => {
    const {user} = req
    const {devices} = user
    const targetDevice = devices.filter(device => device.name === req.body.deviceName)[0]
    if (!targetDevice) return res.status(404).send('Device Not Found')
    if (req.body.hasOwnProperty('newDeviceName')) targetDevice.name = newDeviceName
    if (req.body.hasOwnProperty('pushURL')) targetDevice.name = req.body.newDeviceName
    user.save(err => {
      if (err) return next(err)
      res.sendStatus(200)
    })
  })
}

module.exports = updateDevice
