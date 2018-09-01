import fetchIfModified from './fetchIfModified'
import urlBase64ToUint8Array from './urlBase64ToUint8Array'
import removeMissingProperties from './removeMissingProperties'
import store from 'Store'


async function setupPushNotifications(worker) {
  let pushSubscription = await worker.pushManager.getSubscription()
  const vapidKeyRequest = await fetchIfModified('/vapidKey')
  const vapidKey = urlBase64ToUint8Array(vapidKeyRequest.value)
  if (!localStorage.deviceId) {
    if (pushSubscription) await pushSubscription.unsubscribe()
    await registerDevice(await subscribe(worker, vapidKey))
  } else if (vapidKeyRequest.modified === true || !pushSubscription) {
    if (pushSubscription) await pushSubscription.unsubscribe()
    await setSubscription(await subscribe(worker, vapidKey))
  } else {
    const validity = await validDevice(pushSubscription)
    if (validity === 'invalid') {
      await setSubscription(pushSubscription)
    } else if (validity === 'not found') {
      await registerDevice(pushSubscription)
    }
  }
  store.device = {id: localStorage.deviceId, name: localStorage.deviceName};
  return {pushSubscription, vapidKey, id: localStorage.deviceId, name: localStorage.deviceName}
}

function subscribe(worker, vapidKey) {
  return worker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: vapidKey
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

async function setSubscription(subscription) {
  try {
    await updateDevice(subscription)
  } catch(err) {
    await unregisterDevice()
    await registerDevice(subscription)
  }
}

function updateDevice(pushSubscription) {
  return fetch('/devices/update?device='+encodeURIComponent(localStorage.deviceId), {statusRange: 200, method: 'put', body: removeMissingProperties(JSON.parse(JSON.stringify(pushSubscription)))})
}
async function unregisterDevice() {
  await fetch('/devices/unregister?device='+encodeURIComponent(localStorage.deviceId), {statusRange: 200, method: 'delete'})
  delete localStorage[deviceId]
  delete localStorage[deviceName]
}

export default setupPushNotifications
