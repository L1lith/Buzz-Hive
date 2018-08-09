const url = require('url')
const {allowedPushURLHostnames} = require('../config.json')

function validatePushURL(pushURL) {
  const pushURLParsed = url.parse(pushURL)
  if (!allowedPushURLHostnames.includes(pushURLParsed.hostname)) return false
  return true
}

module.exports = validatePushURL
