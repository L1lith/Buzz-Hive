const isValidDate = require('./isValidDate')

function serveStaticString(string, lastModified) {
  if (typeof string != 'string') throw new Error('Expected String')
  const lastModifiedUTC = lastModified.toUTCString()
  if (lastModified) {
    return (req, res) => {
      if (lastModified) res.set('Last-Modified', lastModifiedUTC)
      let ifModified = req.headers["if-modified-since"]
      if (!ifModified) return res.send(string)
      ifModified = new Date(ifModified)
      if (!isValidDate(ifModified)) return res.status(400).send('Malformed If-Modified-Since Date')
      if (ifModified < lastModified) {
        res.status(200).send(string)
      } else {
        res.sendStatus(304)
      }
    }
  } else {
    return (req, res) => res.send(string)
  }
}

module.exports = serveStaticString
