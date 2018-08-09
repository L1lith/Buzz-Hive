function validDevice(router, {middleware}) {
  router.get('/valid', middleware.authenticate({getUser: true}), )
}

module.exports = validDevice
