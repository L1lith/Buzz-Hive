const {resolve} = require('path')

module.exports = {
  entry: "./source/index.js",
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  mode: process.env.NODE_ENV
}
