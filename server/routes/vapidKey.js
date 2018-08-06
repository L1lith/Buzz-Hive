function vapidKey(router, {vapidKeys}) {
  const {publicKey, modified} = vapidKeys
  const lastModified = modified.toUTCString()
  router.get('/vapidKey', (req, res) => {
    res.set('Last-Modified', lastModified)
    res.send(publicKey)
  })
}

module.exports = vapidKey
