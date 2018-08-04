const {Router} = require('express')
const routeMap = require('require-directory')(module)

async function setupRouter(data={}, routes=routeMap, router) {
    if (router === undefined) router = new Router()
    if (typeof routes != 'object' || routes === null) throw new Error('Routes Not Object')
    if (typeof routes.index == 'function') await routes.index(router, data)
    const routeEntries = Object.entries(routes)
    for (let i = 0; i < routeEntries.length; i++) {
      const [pathKey, value] = routeEntries[i]
      if (pathKey === 'index') continue
      if (typeof value == 'object' && value !== null) {
        if (value.hasOwnProperty('handler')) {
          await value.handler(router, data)
          continue
        }
        router.use('/'+pathKey, await setupRouter(data, value))
      } else if (typeof value == 'function') {
        await value(router, data)
      } else {
        throw new Error('Expected Route Handler or Route Object')
      }
    }
    return router
}

module.exports = setupRouter
