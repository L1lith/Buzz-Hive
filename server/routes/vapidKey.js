function vapidKey(router, {vapidKeys}) {
  const {publicKey, modified} = vapidKeys
  const lastModified = modified.toUTCString()
  router.get('/vapidKey', (req, res) => {
    res.send(publicKey)
  })
}

module.exports = vapidKey
