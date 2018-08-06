async function getVapidKey() {
  const {vKLM} = localStorage
  if (typeof vLKM == 'string' && vKLM.length > 0) {
    const response = await fetch('/vapidkey', {headers: {"If-Modified-Since": vKLM}})
    if (response.status === 200) {
      const vapidKey = await response.text()
      localStorage.vLKM = (new Date()).toUTCString()
      localStorage.vapidKey = vapidKey
      return vapidKey
    } else if (response.status === 304) {
      return localStorage.vapidKey
    } else {
      throw new Error(`Unexpected Status Code: "${response.status}"`)
    }
  } else {
    const response = await fetch('/vapidKey')
    const vapidKey = await response.text()
    localStorage.vLKM = (new Date()).toUTCString()
    localStorage.vapidKey = vapidKey
    return vapidKey
  }
}

module.exports = getVapidKey
