const {details} = require('sandhands')
const {ObjectId} = require('mongoose').Types

function getDevices(data) {
  const {Device} = data.models
  return (options={})=>{
    const {singleDevice=false, allowAllDevices=false} = options
    if (singleDevice === true) {
      return async (req, res, next) => {
        if (req.user === undefined) return next(new Error('Missing Req User'))
        let {device} = req.query
        const queryError = details(device, String)
        if (queryError !== null) return res.status(400).send(queryError)
        try {
          device = await findDevice(Device, req.user.username, device)
        } catch(err) {
          return next(err)
        }
        if (!device) return res.status(404).send('Device Not Found')
        req.device = device
        next()
      }
    } else {
      return async (req, res, next) => {
        if (req.user === undefined) return next(new Error('Missing Req User'))
        let {devices} = req.query
        if (typeof devices == 'string') devices = devices.split(',')
        if (devices === undefined && allowAllDevices === true) {
          try {
            devices = await findDevice(Device, req.user.username)
          } catch(err) {
            return next(err)
          }
          if (devices.length < 1) return res.status(400).send('No Registered Devices')
          req.devices = devices
          return next()
        }
        const queryError = details(devices, [String])
        if (queryError !== null) return res.status(400).json(queryError)
        for (let i = 0; i < devices.length; i++) {
            try {
              devices[i] = await findDevice(Device, req.user.username, devices[i])
            } catch(err) {
              return next(err)
            }
            if (!devices[i]) return res.status(404).send('Device Not Found')
        }
        req.devices = devices
        next()
      }
    }
  }
}

function findDevice(devices, username, id) {
  if (typeof id == 'string') {
    return devices.findOne({owner: username, _id: id})
  } else {
    return devices.find({owner: username})
  }
}

module.exports = getDevices
