function logout(router, {functions}) {
  router.get('/logout', functions.middleware.authenticate(), (req,res) => {
    res.clearCookie("session")
    res.clearCookie("username")
    res.sendStatus(200)
  })
}

module.exports = logout
