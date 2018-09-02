import setupPushNotifications from 'Functions/pushNotifications/setup'
import store from 'Store'

async function loadDevice() {
  const worker = await navigator.serviceWorker.getRegistration()
  if (worker && store.device === null && localStorage.hasOwnProperty('deviceId') && localStorage.hasOwnProperty('deviceName')) {
    const {id, name} = await setupPushNotifications(worker)
    store.device = {id, name}
  }
}

export default loadDevice
