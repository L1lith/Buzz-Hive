const webpush = require('web-push')
const {access, readFile, writeFile} = require('fs-promise')
const {resolve} = require('path')
const {supportEmail} = require('../config.json')

const keyPath = resolve(__dirname, '../pushApplicationKeys.json')

async function createApplicationKey() {
  let vapidKeys = null
  try {
    await access(keyPath)
    vapidKeys = JSON.parse(await readFile(keyPath))
  } catch(err) {
    vapidKeys = webpush.generateVAPIDKeys()
    await writeFile(keyPath, JSON.stringify(vapidKeys, null, 2))
  }
  webpush.setVapidDetails('mailto:' + supportEmail, vapidKeys.publicKey, vapidKeys.privateKey)
}

exports.launch = createApplicationKey
