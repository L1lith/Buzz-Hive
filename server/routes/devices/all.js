function allDevices(router, {models, middleware}) {
  const {Device} = models
  router.get('/all', middleware.authenticate({getUser: true}), (req, res, next) => {
    Device.find({owner: req.user.username}, (err, devices) => {
      if (err) return next(err)
      res.status(200).json(devices.map(device => ({id: device._id, name: device.name})))
    })
  })
}

module.exports = allDevices
