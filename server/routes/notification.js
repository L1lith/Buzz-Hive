const {sandhandsExpress} = require('sandhands')

function notification(router, {middleware}) {
  router.post('/notification', middleware.authenticate({getUser: true}), sandhandsExpress({
    message: String,
    title: String,
    to: {_: [String], optional: true}
  }), (req, res) => {
    const {username} = req.user
    
  })
}

module.exports = notification
