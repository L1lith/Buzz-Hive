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
  if (!pushSubscription) pushSubscription = await registration.pushManager.subscribe(vapidKey)

  const validity = await validDevice(pushSubscription)
  if (validity === 'invalid') {
    try {
      await updateDevice(pushSubscription)
    } catch(err) {
      await unregisterDevice()
      await registerDevice(pushSubscription)
    }
  } else if (validity === 'not found') {
    await registerDevice(pushSubscription)
  }
}

function subscribe(registration, vapidKey) {
  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidKey)
  })
}

async function registerDevice(pushSubscription) {
  pushSubscription = removeMissingProperties(JSON.parse(JSON.stringify(pushSubscription)))
  const response = await fetch('/devices/register', {statusRange: 200, method: 'post', body: pushSubscription})
  const {name, id} = await response.json()
  localStorage.deviceName = name
  localStorage.deviceId = id
}
async function validDevice(pushSubscription) {
  const response = await fetch('/devices/valid?device='+encodeURIComponent(localStorage.deviceId), {method: 'post', body: removeMissingProperties(JSON.parse(JSON.stringify(pushSubscription)))})
  if (Math.floor(response.status / 100) === 2) {
    return 'valid'
  } else if (response.status === 404) {
    return 'not found'
  } else if (response.status === 409) {
    return 'invalid'
  } else {
    throw new Error('Unexpected Status Code ' + response.status)
  }
}
function updateDevice(pushSubscription) {
  return fetch('/devices/update?device='+encodeURIComponent(localStorage.deviceId), {statusRange: 200, method: 'put', body: removeMissingProperties(JSON.parse(JSON.stringify(pushSubscription)))})
}
async function unregisterDevice() {
  await fetch('/devices/unregister?device='+encodeURIComponent(localStorage.deviceId), {statusRange: 200, method: 'delete'})
  localStorage.deviceId = null
  localStorage.deviceName = null
}

export default registerServiceWorker
