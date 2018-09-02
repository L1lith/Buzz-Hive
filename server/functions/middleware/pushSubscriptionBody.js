const {details} = require('sandhands')
const validatePushURL = require('../validatePushURL')

const pushSubscriptionFormat = {
  endpoint: String,
  keys: {
    auth: String,
    p256dh: String
  },
  expirationTime: {
    _: String,
    optional: true
  }
}

function pushSubscriptionBody(optional=false, strict=true) {
  return (req, res, next) => {
    const pushSubscriptionError = details(req.body, {_: {subscription: {_: pushSubscriptionFormat, optional}}, strict})
    if (pushSubscriptionError !== null) return res.status(400).json(pushSubscriptionError)
    if (req.body.hasOwnProperty('subscription')) {
      const pushURLError = validatePushURL(req.body.subscription.endpoint)
      if (pushURLError) return res.status(400).send(pushURLError)
    }
    next()
  }
}

module.exports = pushSubscriptionBody
