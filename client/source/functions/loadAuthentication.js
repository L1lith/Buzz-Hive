import store from 'Store'

async function loadAuthentication() {
  let response
  try {
    response = await fetch('/auth/valid', {statusRange: 200})
  } catch(err) {
    store.auth = {loggedIn: false}
    return console.log(err)
  }
  const {name} = await response.json()

  store.auth = {loggedIn: true, name}
}

export default loadAuthentication
