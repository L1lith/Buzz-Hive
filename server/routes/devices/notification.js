const {sandhandsExpress} = require('sandhands')

function notification(router, {middleware, functions}) {
  const {sendNotification} = functions
  router.post('/notification',
    middleware.authenticate({getUser: true}),
    sandhandsExpress({
      message: String,
      devices: {_: [String], minLength: 1, optional: true}
    }),
    middleware.getDevices({allowAllDevices: true}),
      async (req, res, next) => {
    const {devices} = req
    const {message} = req.body
    await Promise.all(devices.map(device => {
      return sendNotification(device.subscription, message)
    })).then(results=>{
      console.log(results)
      res.sendStatus(200)
    }).catch(err => {
      next(err)
    })
  })
}

module.exports = notification
