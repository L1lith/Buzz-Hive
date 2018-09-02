import setupPushNotifications from 'Functions/pushNotifications/setup'
import store from 'Store'

async function loadDevice() {
  if (store.device !== null) return store.device
  const worker = await navigator.serviceWorker.getRegistration()
  if (worker && store.device === null && localStorage.hasOwnProperty('deviceId') && localStorage.hasOwnProperty('deviceName')) {
    const {id, name} = await setupPushNotifications(worker)
    return {id, name}
  }
  return null
}

export default loadDevice
