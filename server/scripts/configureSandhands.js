const {customFormat} = require('sandhands')

function configureSandhands() {
  customFormat('displayName', {
    _: String,
    validate: [
      name => name.startsWith(' ') ? 'Display Name Cannot Start With Spaces!' : true,
      name => name.endsWith(' ') ? 'Display Name Cannot End With Spaces!' : true
    ]
  })
}

exports.launch = configureSandhands
