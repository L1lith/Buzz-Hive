const fetchIfModified = require('./functions/fetchIfModified')
const urlBase64ToUint8Array = require('./functions/urlBase64ToUint8Array')

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return
  const {serviceWorker} = navigator
  const registration = await serviceWorker.register('/worker.js')
  console.log(registration)
  let pushSubscription = await registration.pushManager.getSubscription()
  const vapidKeyRequest = await fetchIfModified('/vapidKey')
  const vapidKey = urlBase64ToUint8Array(vapidKeyRequest.value)
  if (vapidKeyRequest.modified === true && pushSubscription) {
    await registration.pushManager.unsubscribe()
    pushSubscription = null
  }
  if (!pushSubscription) {
    pushSubscription = await registration.pushManager.subscribe({applicationServerKey: vapidKey, userVisibleOnly: true})
    if (localStorage.deviceName) {
      await fetch('/devices/update', {statusRange: 200, method: 'patch', body: {pushURL: pushSubscription.endpoint, deviceName: localStorage.deviceName}})
    } else {
      const response = await fetch('/devices/register', {statusRange: 200, method: 'post', body: {pushURL: pushSubscription.endpoint}})
      const {deviceName} = await response.json()
      localStorage.deviceName = deviceName
    }
  }
}

module.exports = registerServiceWorker
