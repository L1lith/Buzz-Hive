const RateLimit = require('express-rate-limit')

const authLimit = new RateLimit({
  windowMs: 10 * 24 * 60 * 60 * 1000, // 10 days
  max: 100,
  delayAfter: 15, // After 15th Request
  delayMs: 2 * 60 * 60 * 1000 // Delay 2 hours
  message: "Too many requests to the authentication API, please try again later."
})

function auth(router) {
  router.use(authLimit)
}

module.exports = auth
