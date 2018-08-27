const RateLimit = require('express-rate-limit')

const longAuthLimit = new RateLimit({
  windowMs: 7 * 24 * 60 * 60 * 1000, // 1 Week
  max: 50,
  message: "Too many requests to the authentication API, please try again later.",
  delayMs: 0 // Disabled
})

const shortAuthLimit = new RateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 25,
  delayMs: 0, // Delay 10 seconds
  message: "Too many requests to the authentication API, please try again later."
})

function auth(router) {
  router.use(/^(?!\/valid$).+/, longAuthLimit)
  router.use(/^(?!\/valid$).+/, shortAuthLimit)
}

module.exports = auth
