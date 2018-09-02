import setupPushNotifications from 'Functions/pushNotifications/setup'
import store from 'Store'

async function loadDevice() {
  if (store.deviceLoaded !== false) throw new Error("Device Already Loaded")
  const worker = await navigator.serviceWorker.getRegistration()
  if (worker && store.device === null && localStorage.hasOwnProperty('deviceId') && localStorage.hasOwnProperty('deviceName')) {
    const {id, name} = await setupPushNotifications(worker)
    store.deviceLoaded = true
    store.device = {id, name}
  }
  store.deviceLoaded = true
}

export default loadDevice
