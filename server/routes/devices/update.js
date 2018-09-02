const asyncHandler = require('express-async-handler')
const {sandhandsExpress} = require('sandhands')

const bodyFormat = {_: {
  subscription: {
    _: {}, strict: false, optional: true
  },
  name: {
    _: String, optional: true
  }
}, validate: body => Object.keys(body).length > 0 ? true : 'Body Empty'}

function updateDevice(router, {functions, middleware}) {
  const {validatePushURL} = functions
  router.put('/update', middleware.authenticate({getUser: true}),
    sandhandsExpress(bodyFormat),
    middleware.pushSubscriptionBody(true),
    middleware.getDevices({singleDevice: true}),
      asyncHandler(async (req, res) => {
    const {device, body} = req

    Object.assign(device, req.body)
    await device.save()
    return res.sendStatus(200)
  }))
}

module.exports = updateDevice
