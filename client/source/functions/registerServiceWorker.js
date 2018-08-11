function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) throw new Error('Service Worker Not in Navigator')
  const {serviceWorker} = navigator
  return serviceWorker.register('/worker.js')
}

export default registerServiceWorker
