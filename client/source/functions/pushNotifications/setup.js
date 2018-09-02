import fetchIfModified from 'Functions/fetchIfModified'
import urlBase64ToUint8Array from 'Functions/urlBase64ToUint8Array'
import store from 'Store'
import validDevice from './validDevice'
import registerDevice from './registerDevice'
import setSubscription from './setSubscription'
import subscribe from './subscribe'


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

export default setupPushNotifications
