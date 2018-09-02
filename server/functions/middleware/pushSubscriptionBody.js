const {details} = require('sandhands')

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

function pushSubscriptionBody(optional=false) {
  return (req, res, next) => {
    const pushSubscriptionError = details(req.body, {subscription: {_: pushSubscriptionFormat, optional}})
    if (pushSubscriptionError !== null) return res.status(400).json(pushSubscriptionError)
    if (req.body.hasOwnProperty('subscription')) {
      const pushURLError = validatePushURL(req.body.subscription.endpoint)
      if (pushURLError) return res.status(400).send(pushURLError)
    }
    next()
  }
}

module.exports = pushSubscriptionBody
