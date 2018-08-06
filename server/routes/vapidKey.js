function vapidKey(router, {vapidKeys}) {
  router.get('/vapidKey', (req, res) => {
    res.send(vapidKeys.publicKey)
  })
}

module.exports = vapidKey
