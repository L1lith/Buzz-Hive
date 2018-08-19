import {Route} from 'react-router-dom'

const pages = require.context('.', true, /\.js$/)

export default pages.keys().filter(key => key !== './index.js').map((page, index) => {
  page = pages(page)
  if (page.hasOwnProperty('default')) page = page.default
  return (
    <Route key={index} {...page}/>
  )
})
