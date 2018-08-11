self.addEventListener('push', event => {
  let message
  try {
    message = JSON.parse(event.data.text())
  } catch(err) {
    return
  }
  console.log({message})
  if (typeof message !== 'object' || message === null) return
  if (message.type === 'notification') {
    const {title='Buzz Hive', body} = message
    const options = {
      body
    }
    event.waitUntil(self.registration.showNotification(title, options))
  }
})
