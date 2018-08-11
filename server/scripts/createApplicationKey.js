const webpush = require('web-push')
const {access, readFile, writeFile, stat} = require('fs-promise')
const {resolve} = require('path')
const util = require('util')
const {supportEmail} = require('../config.json')

const keyPath = resolve(__dirname, '../pushApplicationKeys.json')

async function createApplicationKey() {
  let vapidKeys = null
  try {
    await access(keyPath)
    vapidKeys = JSON.parse(await readFile(keyPath))
    vapidKeys.modified = new Date(util.inspect((await stat(keyPath)).mtime))
  } catch(err) {
    vapidKeys = webpush.generateVAPIDKeys()
    keyModified = new Date()
    await writeFile(keyPath, JSON.stringify(vapidKeys, null, 2))
    vapidKeys.modified = new Date()
  }
  webpush.setVapidDetails('mailto:' + supportEmail, vapidKeys.publicKey, vapidKeys.privateKey)
  return {vapidKeys, functions: {sendNotification: createNotificationSender(vapidKeys)}}
}

function createNotificationSender(vapidKeys) {
  const {publicKey, privateKey} = vapidKeys
  return (subscription, message, options) => {
    //console.log([pushSubscription, message, options])
    return webpush.sendNotification(subscription, message, options)
  }
}

exports.launch = createApplicationKey
