function vapidKey(router, {functions, vapidKeys}) {
  const {publicKey, modified} = vapidKeys
  router.get('/vapidKey', functions.serveStaticString(publicKey, modified))
}

module.exports = vapidKey
