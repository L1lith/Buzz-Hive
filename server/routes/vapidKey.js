function vapidKey(router, {functions, vapidKeys}) {
  const {publicKey, modified} = vapidKeys
  router.get('/vapidkey', functions.serveStaticString(publicKey, modified))
}

module.exports = vapidKey
