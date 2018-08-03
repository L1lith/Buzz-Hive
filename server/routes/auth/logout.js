function logout(router, {models, functions}) {
  router.get('/login', functions.middleware.authenticate())
}

module.exports = logout
