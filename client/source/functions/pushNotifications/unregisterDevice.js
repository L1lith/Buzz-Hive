async function unregisterDevice() {
  await fetch('/devices/unregister?device='+encodeURIComponent(localStorage.deviceId), {statusRange: 200, method: 'delete'})
  delete localStorage.deviceId
  delete localStorage.deviceName
}

export default unregisterDevice
