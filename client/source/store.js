import jabr from 'jabr'

const store = jabr({
  auth: {
    loggedIn: false,
    username: null
  }
})

export default store
