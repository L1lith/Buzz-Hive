function updateDevice(pushSubscription) {
  return fetch('/devices/update?device='+encodeURIComponent(localStorage.deviceId), {statusRange: 200, method: 'put', body: {subscription: removeMissingProperties(JSON.parse(JSON.stringify(pushSubscription)))}})
}

export default updateDevice
