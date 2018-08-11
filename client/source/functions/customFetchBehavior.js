function customFetchBehavior() {
  const oldFetch = window.fetch
  window.fetch = async (url, options={}, ...args) => {
    if (typeof options == 'object' && options !== null && typeof options.body == 'object' && options.body !== null) {
      options.body = JSON.stringify(options.body)
      if (typeof options.headers != 'object' || options.headers === null) options.headers = {}
      options.headers['Content-Type'] = 'application/json'
    }
    let {statusRange, credentials} = options
    delete options.statusRange
    const response = await oldFetch(url, options, ...args)
    if (credentials === undefined) options.credentials = 'same-site'
    if (![null, undefined].includes(statusRange)) {
      const {status} = response
      if (typeof statusRange == 'number' && isFinite(statusRange)) statusRange = [statusRange]
      if (!Array.isArray(statusRange) || statusRange.length > 2 || statusRange.length < 1) return reject('Malformed Status Ranged')
      if (statusRange.length === 1) statusRange[1] = statusRange[0]
      if (statusRange[0] > statusRange[1]) throw 'Malformed Status Ranged'
      if (status < statusRange[0] || status > statusRange[1]) throw 'Response Status Outside Status Range'

  }
  return response
}
}

export default customFetchBehavior
