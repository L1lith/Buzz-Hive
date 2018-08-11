const {sandhandsExpress} = require('sandhands')

module.exports = sandhandsExpress({
  endpoint: String,
  keys: {
    auth: String,
    p256dh: String
  },
  expirationTime: {
    _: String,
    optional: true
  }
})
