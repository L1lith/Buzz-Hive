async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return
  const {serviceWorker} = navigator
  await (await serviceWorker.register('/worker.js')).pushManager.subscribe()
}

module.exports = registerServiceWorker
