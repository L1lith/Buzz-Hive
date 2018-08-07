function fetchSupportJSON() {
  const oldFetch = window.fetch
  window.fetch = (url, options, ...args) => {
    if (typeof options == 'object' && options !== null && typeof options.body == 'object' && options.body !== null) {
      options.body = JSON.stringify(options.body)
      if (typeof options.headers != 'object' || options.headers === null) options.headers = {}
      options.headers['Content-Type'] = 'application/json'
    }
    return oldFetch(url, options, ...args)
  }
}

module.exports = fetchSupportJSON
