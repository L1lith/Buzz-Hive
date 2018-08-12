import jabr from 'jabr'
import loadAuthentication from './functions/loadAuthentication'

function createStore() {
  const store = jabr({
    auth: {
      loggedIn: false,
      username: null
    }
  })
  loadAuthentication(store)
  return store
}

export default createStore
