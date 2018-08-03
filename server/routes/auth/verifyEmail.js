const {sandhandsExpress} = require('sandhands')

function verifyEmail(router, {middleware}) {
  router.get('/verifyEmail', middleware.authenticate({getUser: true, requireVerification: false}), (req, res, next) => {
    if (req.user.verified === true) return res.status(400).send('Already Verified')
    const {randomBytes} = require('crypto')
    randomBytes(8, (err, buf) => {
      if (err) return next(err)
      req.user.verificationCode = buf.toString('base64')
      req.user.save(err => {
        if (err) return next(err)
        res.status(200)
        // Email the verification code here
      })
    })
  })
  router.post('/verifyEmail', sandhandsExpress({verificationCode: String}), middleware.authenticate({getUser: true, requireVerification: false}), (req, res) => {
    if (typeof req.user.verificationCode != 'string') return res.sendStatus(500)
    if (req.body.verificationCode === req.user.verificationCode) {
      // Passed Verification
      req.user.verified = true
      req.user.verificationCode = undefined
      req.user.save(err => {
        if (err) return next(err)
        res.sendStatus(200)
      })
    } else {
      // Failed Verification
      res.status(401).send('Invalid Verification Code')
      req.user.verificationCode = undefined
      req.user.save()
    }
  })
}

module.exports = verifyEmail
