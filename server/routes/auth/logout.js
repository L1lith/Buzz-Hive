function logout(router, {middleware}) {
  router.get('/logout', middleware.authenticate(), (req, res, next) => {
    req.session.remove(err => {
      if (err) return next(err)
      res.clearCookie("session")
      res.clearCookie("username")
      res.sendStatus(200)
    })
  })
}

module.exports = logout
