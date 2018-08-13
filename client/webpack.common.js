const {resolve} = require('path')
const webpack = require('webpack')
const customFetch = require('./source/functions/customFetch')

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
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      }
    ]
  },
  resolve: {
    alias: {
      Functions: resolve(__dirname, 'source/functions/'),
      Components: resolve(__dirname, 'source/components/'),
      Root: resolve(__dirname, 'source/'),
      Store: resolve(__dirname, 'source/store.js')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      fetch: customFetch
    }),
    new webpack.ProvidePlugin({
      'React': 'react'
    })
  ]
}
