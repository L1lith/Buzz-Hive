const {resolve} = require('path')

module.exports = {
  entry: ['babel-polyfill', "./source/index.js"],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}
