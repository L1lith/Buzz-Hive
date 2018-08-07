async function fetchIfModified(url, fetchOptions={}) {
  const cachePath = 'cache/' + url
  let cache = localStorage[cachePath]
  if (cache) {
    cache = JSON.parse(cache)
    const {lastFetched, lastValue} = cache
    const response = await fetch(url, {...fetchOptions, headers: {"If-Modified-Since": lastFetched}})
    if (response.status === 200) {
      const value = await response.text()
      cacheResponse(cachePath, value)
      return {value, modifed: true, response}
    } else if (response.status === 304) {
      return {value: lastValue, modified: false, response}
    } else {
      throw new Error(`Unexpected Status Code "${response.status}"`)
    }
  } else {
    const response = await fetch(url)
    const value = await response.text()
    cacheResponse(cachePath, value)
    if (response.status === 200) {
      return {value, modified: true, response}
    } else {
      throw new Error(`Unexpected Status Code "${response.status}"`)
    }
  }
}

function cacheResponse(cachePath, value) {
  let cache = {
    lastValue: value,
    lastFetched: (new Date()).toUTCString()
  }
  localStorage[cachePath] = JSON.stringify(cache)
}

module.exports = fetchIfModified
