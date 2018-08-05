function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return
  const {serviceWorker} = navigator
  return serviceWorker.register('/worker.js')
}

module.exports = registerServiceWorker
