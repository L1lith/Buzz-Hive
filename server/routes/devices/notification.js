const {sandhandsExpress} = require('sandhands')

function notification(router, {middleware, functions}) {
  console.log({functions})
  router.post('/notification', middleware.authenticate({getUser: true}), sandhandsExpress({
    message: String,
    title: String,
    devices: {_: [String], minLength: 1, optional: true}
  }), (req, res) => {
    const {username, devices} = req.user
    const {message, title} = req.body
    const requestedDevices = req.body
    if (requestedDevices && requestedDevices.length > 0) {
      for (let i = 0; i < requestedDevices.length; i++) {
        const deviceName = requestedDevices[i]
        const device = devices.filter(name === deviceName)[0]
        if (!device) return res.status(404).send(`Device "${deviceName}" Not Found`)
        requestedDevices[i] = device
      }
    } else {

    }
  })
}

function sendMessageToDevice(device, message) {

}

module.exports = notification
