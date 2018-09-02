async function unregisterDevice(deviceId=localStorage.deviceId) {
  await fetch('/devices/unregister?device='+encodeURIComponent(deviceId), {statusRange: 200, method: 'delete'})
  if (deviceId === localStorage.deviceId) {
    delete localStorage.deviceId
    delete localStorage.deviceName
  }
}

export default unregisterDevice
