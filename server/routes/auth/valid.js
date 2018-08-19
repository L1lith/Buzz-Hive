function valid(router, {middleware}) {
  router.get('/valid', middleware.authenticate({requireVerification: false, getUser: true}), (req, res) => {
    res.status(200).json({name: req.user.displayName})
  })
}

module.exports = valid
