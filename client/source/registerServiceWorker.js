const fetchIfModified = require('./functions/fetchIfModified')
const urlBase64ToUint8Array = require('./functions/urlBase64ToUint8Array')

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return
  const {serviceWorker} = navigator
  const registration = await serviceWorker.register('/worker.js')
  let pushSubscription = await registration.pushManager.getSubscription()

  if (!pushSubscription) {
    const vapidKey = urlBase64ToUint8Array((await fetchIfModified('/vapidKey')).value)
    pushSubscription = await registration.pushManager.subscribe({applicationServerKey: vapidKey, userVisibleOnly: true})
    const response = await fetch('/devices/register', {statusRange: 200, method: 'post', body: {pushURL: pushSubscription.endpoint}})
    const {deviceName} = await response.json()
    localStorage.deviceName = deviceName
  }
}

module.exports = registerServiceWorker
