function logout(router, {functions}) {
  router.get('/logout', functions.middleware.authenticate(), (req, res, next) => {
    req.session.remove(err => {
      if (err) return next(err)
      res.clearCookie("session")
      res.clearCookie("username")
      res.sendStatus(200)
    })
  })
}

module.exports = logout
