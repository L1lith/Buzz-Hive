const {sandhandsExpress} = require('sandhands')
const UAParser = require('ua-parser-js')


function registerDevice(router, {middleware}) {
  router.post('/register', middleware.authenticate({getUser: true}), sandhandsExpress({
    pushURL: String
  }), (req, res, next) => {
    const {devices} = req.user
    const {pushURL} = req.body
    let deviceName = null
    if (req.headers['user-agent']) {
      const UA = new UAParser(req.headers['user-agent'])
      deviceName = `${UA.getOS().name || "Unknown OS"}-${UA.getBrowser().name || "Unknown Browser"}-${Math.random().toString().substring(2,6)}`
    } else {
      deviceName = "Unknown Device "+Math.random().toString().substring(2,6)
    }
    if (devices.filter(device => device.name === deviceName).length > 0) return next(new Error("Duplicate Device Name"))
    req.user.devices.push({name: deviceName, pushURL})
    req.user.save(err => {
      if (err) next(err)
      res.json({deviceName})
    })
  })
}

module.exports = registerDevice
