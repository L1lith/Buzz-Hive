const {sandhandsExpress} = require('sandhands')
const UAParser = require('ua-parser-js')

function registerDevice(router, {middleware, functions, models}) {
  const {Device} = models
  const {validPushURL} = functions
  router.post('/register', middleware.authenticate({getUser: true}), sandhandsExpress({
    pushURL: String
  }), (req, res, next) => {
    const {pushURL} = req.body
    if (!validPushURL(pushURL)) return res.sendStatus(400)
    let deviceName = null
    if (req.headers['user-agent']) {
      const UA = new UAParser(req.headers['user-agent'])
      deviceName = `${UA.getOS().name || "Unknown OS"}-${UA.getBrowser().name || "Unknown Browser"}-${Math.random().toString().substring(2,6)}`
    } else {
      deviceName = "Unknown Device "+Math.random().toString().substring(2,6)
    }
    const device = new Device({owner: req.user.username, name: deviceName, pushURL})
    device.save(err => {
      if (err) return next(err)
      res.json({deviceName})
    })
  })
}

module.exports = registerDevice
