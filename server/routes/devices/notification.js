const {sandhandsExpress} = require('sandhands')

function notification(router, {middleware, functions}) {
  const {sendNotification} = functions
  router.post('/notification',
    middleware.authenticate({getUser: true}),
    sandhandsExpress({
      message: String,
      title: {_: String, optional: true},
      devices: {_: [String], minLength: 1, optional: true}
    }),
    middleware.getDevices({allowAllDevices: true}),
      async (req, res, next) => {
    const {devices} = req
    const {message} = req.body
    let notification = {type: 'notification', body: req.body.message}
    if (req.body.hasOwnProperty('title')) notification.title = req.body.title
    notification = JSON.stringify(notification)
    await Promise.all(devices.map(device => {
      return sendNotification(device.subscription, notification)
    })).then(results=>{
      console.log(results)
      res.sendStatus(200)
    }).catch(err => {
      next(err)
    })
  })
}

module.exports = notification
