console.log("Service Worker Running")
self.addEventListener('push', event => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Notice';
  const options = {
    body: 'Yay it works.',
  };

  event.waitUntil(self.registration.showNotification(title, options))
})
