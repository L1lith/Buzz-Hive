const url = require('url')
const {allowedPushURLHostnames} = require('../config.json')

function validatePushURL(pushURL) {
  const pushURLParsed = url.parse(pushURL)
  if (!allowedPushURLHostnames.includes(pushURLParsed.hostname)) return 'Invalid Origin'
  if (pushURLParsed.protocol !== 'https:') return 'Invalid Protocol'
  return null
}

module.exports = validatePushURL
