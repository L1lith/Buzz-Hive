function valid(router, {middleware}) {
  router.get('/valid', middleware.authenticate({requireVerification: false}), (req, res) => {
    res.sendStatus(200)
  })
}

module.exports = valid
