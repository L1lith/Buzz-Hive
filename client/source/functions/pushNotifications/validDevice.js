import removeMissingProperties from 'Functions/removeMissingProperties'

async function validDevice(pushSubscription) {
  const response = await fetch('/devices/valid?device='+encodeURIComponent(localStorage.deviceId), {method: 'post', body: {subscription: removeMissingProperties(JSON.parse(JSON.stringify(pushSubscription)))}})
  if (Math.floor(response.status / 100) === 2) {
    localStorage.deviceName = (await response.json()).name
    return 'valid'
  } else if (response.status === 404) {
    return 'not found'
  } else if (response.status === 409) {
    return 'invalid'
  } else {
    throw new Error('Unexpected Status Code ' + response.status)
  }
}

export default validDevice
