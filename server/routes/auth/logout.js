const authenticate = require('../../middleware/authenticate')

function logout(router, {models, functions}) {
  router.get('/login', authenticate(models))
}

module.exports = logout
