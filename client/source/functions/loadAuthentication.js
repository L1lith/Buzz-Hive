import store from 'Store'

async function loadAuthentication() {
  let response
  try {
    response = await fetch('/auth/valid', {statusRange: 200})
  } catch(err) {
    store.auth.loggedIn = false
    store.auth.username = null
    return console.log(err)
  }
  const {username} = await response.json()

  store.auth.loggedIn = true
  store.auth.username = username
}

export default loadAuthentication
