function valid(router, {middleware}) {
  console.log(router)
  router.get('/valid', middleware.authenticate(), (req, res) => {
    res.sendStatus(200)
  })
}

module.exports = valid
