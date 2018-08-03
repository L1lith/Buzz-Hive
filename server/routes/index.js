const {Router} = require('express')
const routes = require('require-directory')(module)

async function router(app, data) {
  await setupRoutes(routes, app, data)
}

async function setupRoutes(routes, app, data={}) {
    if (typeof routes != 'object' || routes === null) throw new Error('Routes Not Object')
    const routeEntries = Object.entries(routes)
    for (let i = 0; i < routeEntries.length; i++) {
      const [pathKey, value] = routeEntries[i]
      if (pathKey === 'index') continue
      if (typeof value == 'object' && value !== null) {
        const router = new Router()
        if (typeof value.index == 'function') await value.index(router, data)
        await setupRoutes(value, router, data)
        app.use('/'+pathKey, router)
      } else if (typeof value == 'function') {
        await value(app, data)
      } else {
        throw new Error('Expected Route Handler or Route Object')
      }
    }
}

module.exports = router
