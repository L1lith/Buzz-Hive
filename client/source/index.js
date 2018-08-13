import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {Provider} from 'jabr-react'
import store from 'Store'
import loadAuthentication from 'Functions/loadAuthentication'

const stylesRequireContext = require.context('./styles', true, /\.less$/)
stylesRequireContext.keys().forEach(stylesRequireContext)

function run() {
  const root = document.getElementById('root')
  if (!root) throw new Error('Root Element Not Found!')

  ReactDOM.render(<Provider store={store}><App/></Provider>, root)
  loadAuthentication()
}

window.addEventListener('load', run)
