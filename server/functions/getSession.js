const {randomBytes} = require('crypto')

function getSession(owner, models, callback) {
  const {Session} = models
  Session.findOne({owner}, (err, session) => {
    if (err) return callback(err, null)
    if (session) return callback(null, session._id, session)

    randomBytes(20, (err, buf) => {
      if (err) return callback(err, null)
      const token = buf.toString('base64')
      const newSession = new Session({owner, _id: token})
      newSession.save(err => {
        if (err) return callback(err, null)
        callback(null, token, session)
      })
    })
  })
}

module.exports = getSession
