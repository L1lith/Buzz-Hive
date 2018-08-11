function updateDevice(router, {functions, middleware}) {
  const {validPushURL} = functions
  router.put('/update', middleware.authenticate({getUser: true}),
    middleware.pushSubscriptionBody,
    middleware.getDevices({singleDevice: true}),
      (req, res) => {
    const {device} = req

    if (!validPushURL(req.body.endpoint)) return res.sendStatus(400).send('Malformed Push URL')

    device.subscription = req.body
    device.save(err => {
      if (err) return next(err)
      res.sendStatus(200)
    })
  })
}

module.exports = updateDevice
