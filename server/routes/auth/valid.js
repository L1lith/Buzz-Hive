function valid(router, {middleware}) {
  router.get('/valid', middleware.authenticate({requireVerification: false, getUser: true}), (req, res) => {
    res.status(200).json({username: req.user.username})
  })
}

module.exports = valid
