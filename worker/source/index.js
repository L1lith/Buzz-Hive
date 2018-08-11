self.addEventListener('push', event => {
  let message
  try {
    message = JSON.parse(event.data.text())
  } catch(err) {
    return console.log(err)
  }
  if (typeof message !== 'object' || message === null) return console.log('Push Message Was Not An Object.')
  if (message.type === 'notification') {
    const {title='Buzz Hive', body} = message
    const options = {
      body
    }
    event.waitUntil(self.registration.showNotification(title, options))
  } else {
    console.log('Unexpected Message Type '+message.type)
  }
})
