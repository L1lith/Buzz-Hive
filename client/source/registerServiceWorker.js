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
  if (!pushSubscription || !localStorage.deviceId) {
    pushSubscription = await registration.pushManager.subscribe({applicationServerKey: vapidKey, userVisibleOnly: true})
    if (localStorage.deviceId) {
      try {
        await fetch('/devices/update?device='+encodeURIComponent(localStorage.deviceId), {statusRange: 200, method: 'patch', body: pushSubscription})
      } catch(err) {
        await registerDevice(pushSubscription)
      }
    } else {
      await registerDevice(pushSubscription)
    }
  } else {
    try {
      await fetch('/devices/valid?device='+encodeURIComponent(localStorage.deviceId), {statusRange: 200, method: 'post', body: pushSubscription})
    } catch(err) {
      await registerDevice(pushSubscription)
    }
  }
}

async function registerDevice(pushSubscription) {
  const response = await fetch('/devices/register', {statusRange: 200, method: 'post', body: pushSubscription})
  const {name, id} = await response.json()
  localStorage.deviceName = name
  localStorage.deviceId = id
}

module.exports = registerServiceWorker
