import removeMissingProperties from 'Functions/removeMissingProperties'

async function registerDevice(pushSubscription) {
  pushSubscription = removeMissingProperties(JSON.parse(JSON.stringify(pushSubscription)))
  const response = await fetch('/devices/register', {statusRange: 200, method: 'post', body: {subscription: pushSubscription}})
  const {name, id} = await response.json()
  localStorage.deviceName = name
  localStorage.deviceId = id
}

export default registerDevice
