const {sandhandsExpress} = require('sandhands')

function notification(router, {middleware, functions}) {
  router.post('/notification', middleware.authenticate({getUser: true}), sandhandsExpress({
    message: String,
    //title: String,
    devices: {_: [String], minLength: 1, optional: true}
  }), async (req, res, next) => {
    const {username, devices} = req.user
    const {message} = req.body
    const requestedDevices = req.body
    if (requestedDevices && requestedDevices.length > 0) {
      for (let i = 0; i < requestedDevices.length; i++) {
        const deviceName = requestedDevices[i]
        const device = devices.filter(name === deviceName)[0]
        if (!device) return res.status(404).send(`Device "${deviceName}" Not Found`)
        requestedDevices[i] = device
      }
      await Promise.all(requestedDevices.map(device => {
        return sendMessageToDevice(device.pushURL, message, functions.createNotificationSender)
      })).then(results=>{
        console.log(results)
        res.sendStatus(200)
      }).catch(err => {
        next(err)
      })
    } else {
      if (devices.length < 1) return res.status(400).send('No Registered Devices')
      await Promise.all(devices.map(device => {
        return sendMessageToDevice(device.pushURL, message, functions.createNotificationSender)
      })).then(results=>{
        console.log(results)
        res.sendStatus(200)
      }).catch(err => {
        next(err)
      })
    }
  })
}

function sendMessageToDevice(pushURL, message, createNotificationSender) {
  return createNotificationSender(pushURL)(message)
}

module.exports = notification
