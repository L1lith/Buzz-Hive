const RateLimit = require('express-rate-limit')

const longAuthLimit = new RateLimit({
  windowMs: 7 * 24 * 60 * 60 * 1000, // 1 Week
  max: 100,
  message: "Too many requests to the authentication API, please try again later."
})

const shortAuthLimit = new RateLimit({
  windowMs: 10 * 24 * 60 * 60 * 1000, // 12 hours
  max: 20,
  delayAfter: 8, // After 8th Request
  delayMs: 10 * 1000, // Delay 10 seconds
  message: "Too many requests to the authentication API, please try again later."
})

function auth(router) {
  router.use(longAuthLimit)
  router.use(shortAuthLimit)
}

module.exports = auth
