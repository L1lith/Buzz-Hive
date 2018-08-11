function unregisterDevice(router, {middleware}) {
  router.delete('/unregister',
    middleware.authenticate({getUser: true}),
    middleware.getDevices({singleDevice: true}),
      (req, res, next) => {
    req.device.remove(err => {
      if (err) return next(err)
      res.sendStatus(200)
    })
  })
}

module.exports = unregisterDevice
