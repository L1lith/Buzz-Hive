const Quarry = require("quarry-dns")
const mongoOptions = require('./config').mongo

function launchQuarry() {
  return new Promise((resolve, reject) => {
    const quarry = new Quarry({
      persistence: "mongo",
      "mongo-host": mongoOptions.host,
      "mongo-port": mongoOptions.port,
      "mongo-database": mongoOptions.db
    })
    quarry.listen(err => {
      if (err) return reject(err)
      quarry.persistence.get_configuration((err, configuration) => {
        if(err) return reject(err)

        const {records} = configuration
        resolve({quarry, configuration, records})
      })
    })
  })
}

exports.launchQuarry = launchQuarry
