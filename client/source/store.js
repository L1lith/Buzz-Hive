import jabr from 'jabr'

const store = jabr({
  auth: {
    loggedIn: null
  },
  device: localStorage.hasOwnProperty('deviceId') && localStorage.hasOwnProperty('deviceName') ? {
    name: localStorage.deviceName,
    id: localStorage.deviceId
  } : null
})

export default store
