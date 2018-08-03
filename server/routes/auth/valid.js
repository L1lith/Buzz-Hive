function valid(router, {functions}) {
  router.get('/valid', functions.middleware.authenticate(), (req, res) => {
    res.sendStatus(200)
  })
}

module.exports = valid
