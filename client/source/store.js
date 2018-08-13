import jabr from 'jabr'

const store = jabr({
  auth: {
    loggedIn: null,
    username: null
  }
})

export default store
