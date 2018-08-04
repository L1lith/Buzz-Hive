function hostHive(router, {middleware}) {
  router.get('/host', middleware.authenticate({getUser: true}),(req, res) => {
    const ip = req.ip.split(':')[0]
    
  })
}

module.exports = createHive
