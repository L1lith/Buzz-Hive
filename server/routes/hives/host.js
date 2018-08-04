const {launchQuarry} = require('../../quarry')

async function hostHive(router, {middleware}) {
  const {quarry, configuration, records} = await launchQuarry()
  console.log({quarry, configuration, records})
  router.get('/host', middleware.authenticate({getUser: true}),(req, res) => {
    const ip = req.ip.split(':')[0]

  })
}

module.exports = hostHive
