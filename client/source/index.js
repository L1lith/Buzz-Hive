import setupCustomFetchBehavior from './functions/customFetchBehavior'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

function run() {
  setupCustomFetchBehavior()
  const root = document.getElementById('root')
  if (!root) throw new Error('Root Element Not Found!')
  ReactDOM.render(<App/>, root)
}

window.addEventListener('load', run)
