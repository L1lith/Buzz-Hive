import jabr from 'jabr'

const store = jabr({
  auth: {
    loggedIn: null
  },
  device: null,
  deviceLoaded: false
})

store.on('device', newDevice => {
  if (newDevice === null) {
    delete localStorage.deviceId
    delete localStorage.deviceName
  }
})

export default store
