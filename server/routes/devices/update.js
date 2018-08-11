function updateDevice(router, {functions, middleware}) {
  const {validatePushURL} = functions
  router.put('/update', middleware.authenticate({getUser: true}),
    middleware.pushSubscriptionBody,
    middleware.getDevices({singleDevice: true}),
      (req, res) => {
    const {device} = req

    const pushURLError = validatePushURL(endpoint)
    if (pushURLError) return res.sendStatus(400).send(pushURLError)

    device.subscription = req.body
    device.save(err => {
      if (err) return next(err)
      res.sendStatus(200)
    })
  })
}

module.exports = updateDevice
