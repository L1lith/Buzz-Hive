import unregisterDevice from './unregisterDevice'
import updateDevice from './updateDevice'
import registerDevice from './registerDevice'

async function setSubscription(subscription) {
  try {
    await updateDevice(subscription)
  } catch(err) {
    await unregisterDevice()
    await registerDevice(subscription)
  }
}

export default setSubscription
