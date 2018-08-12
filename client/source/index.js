import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {Provider} from 'jabr-react'
import createStore from './store'


function run() {
  const root = document.getElementById('root')
  if (!root) throw new Error('Root Element Not Found!')

  ReactDOM.render(<Provider store={createStore()}><App/></Provider>, root)
}

window.addEventListener('load', run)
