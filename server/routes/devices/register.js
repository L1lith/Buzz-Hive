function registerDevice(router, {middleware}) {
  app.post('/registerDevice', middleware.authenticate({getUser: true}), sandhandsExpress({
    pushURL: String,
    deviceName: {_: String, optional: true}
  }), (req, res) => {

  })
}

module.exports = registerDevice
