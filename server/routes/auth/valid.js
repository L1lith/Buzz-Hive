function valid(router, {middleware}) {
  router.get('/valid', middleware.authenticate(), (req, res) => {
    res.sendStatus(200)
  })
}

module.exports = valid
