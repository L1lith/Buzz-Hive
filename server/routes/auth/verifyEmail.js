const {sandhandsExpress} = require('sandhands')

function verifyEmail(router, {middleware}) {
  router.get('/verifyEmail', middleware.authenticate({getUser: true, requireVerification: false}), (req, res, next) => {
    const {user} = req
    if (user.verified === true) return res.status(400).send('Already Verified')
    const {randomBytes} = require('crypto')
    randomBytes(8, (err, buf) => {
      if (err) return next(err)
      const verificationCode = user.verificationCode = buf.toString('base64')
      user.save(err => {
        if (err) return next(err)
        res.sendStatus(200)
        // Email the verification code here
      })
    })
  })
  router.post('/verifyEmail', sandhandsExpress({verificationCode: String}), middleware.authenticate({getUser: true, requireVerification: false}), (req, res) => {
    const {user} = req
    if (typeof user.verificationCode != 'string') return res.sendStatus(500)
    if (req.body.verificationCode === user.verificationCode) {
      // Passed Verification
      user.verified = true
      user.verificationCode = undefined
      user.save(err => {
        if (err) return next(err)
        res.sendStatus(200)
      })
    } else {
      // Failed Verification
      res.status(401).send('Invalid Verification Code')
      user.verificationCode = undefined
      user.save(err => {
        if (err) console.log(err)
      })
    }
  })
}

module.exports = verifyEmail
