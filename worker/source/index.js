self.addEventListener('push', event => {
  const title = 'Buzz Hive'
  const options = {
    body: event.data.text(),
  }

  event.waitUntil(self.registration.showNotification(title, options))
})
