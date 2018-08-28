function session(router, {middleware}) {
  router.get('/session', (req, res) => {
    console.log(req, res)
  })
}

module.exports = session
