import fetchIfModified from './functions/fetchIfModified'
import urlBase64ToUint8Array from './functions/urlBase64ToUint8Array'
import removeMissingProperties from './functions/removeMissingProperties'


async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return
  const {serviceWorker} = navigator
  const registration = await serviceWorker.register('/worker.js')
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
        await fetch('/devices/update?device='+encodeURIComponent(localStorage.deviceId), {statusRange: 200, method: 'put', body: removeMissingProperties(JSON.parse(JSON.stringify(pushSubscription)))})
      } catch(err) {
        await registerDevice(pushSubscription)
      }
    } else {
      await registerDevice(pushSubscription)
    }
  } else {
    try {
      await fetch('/devices/valid?device='+encodeURIComponent(localStorage.deviceId), {statusRange: 200, method: 'post', body: removeMissingProperties(JSON.parse(JSON.stringify(pushSubscription)))})
    } catch(err) {
      await registerDevice(pushSubscription)
    }
  }
}

async function registerDevice(pushSubscription) {
  pushSubscription = removeMissingProperties(JSON.parse(JSON.stringify(pushSubscription)))
  const response = await fetch('/devices/register', {statusRange: 200, method: 'post', body: pushSubscription})
  const {name, id} = await response.json()
  localStorage.deviceName = name
  localStorage.deviceId = id
}

export default registerServiceWorker
