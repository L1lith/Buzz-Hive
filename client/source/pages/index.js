import {Route} from 'react-router-dom'
import {connect} from 'jabr-react'

const pages = require.context('.', true, /\.js$/)

export default pages.keys().filter(key => key !== './index.js').map((page, index) => {
  page = pages(page)
  if (page.hasOwnProperty('default')) page = page.default
  const pageConnectOptions = page.connect
  delete page.connect
  if (![null, undefined].includes(pageConnectOptions) && typeof page.component == 'function') {
    page.component = connect(React.createElement(page.component), ...(Array.isArray(pageConnectOptions) ? pageConnectOptions : [pageConnectOptions]))
  }
  page = (<Route key={index} {...page}/>)
  return page
})
