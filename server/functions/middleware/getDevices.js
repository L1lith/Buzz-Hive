const {details} = require('sandhands')

function getDevices(options={}) {
  const {singleDevice=false, allowAllDevices=false} = options
  if (singleDevice === true) {
    return (req, res, next) => {
      if (req.user === undefined) return next(new Error('Missing Req User'))
      if (req.user.devices.length < 1) return res.status(400).send('No Registered Devices')
      let {device} = req.query
      device = findDevices(req.user.devices, device)
      if (!device) return res.status(404).send('Device Not Found')
      req.device = device
      next()
    }
  } else {
    return (req, res, next) => {
      if (req.user === undefined) return next(new Error('Missing Req User'))
      if (req.user.devices.length < 1) return res.status(400).send('No Registered Devices')
      const {devices} = req.query
      if (devices === undefined && allowAllDevices === true) {
        req.devices = req.user.devices
        return next()
      }
      const queryError = details(devices, [String])
      if (queryError !== null) return res.status(400).json(queryError)
      for (let i = 0; i < devices.length; i++) {
         devices[i] = findDevice(req.user.devices, devices[i])
         if (!devices[i]) return res.status(404).send('Device Not Found')
      }
      req.devices = devices
      next()
    }
  }
}

function findDevice(devices, name) {
  return devices.filter(device => device.name === name)[0] || null
}

module.exports = getDevices
