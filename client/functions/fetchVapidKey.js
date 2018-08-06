async function fetchVapidKey() {
  const vapidKey = await (await fetch('/vapidkey')).text()
  const modified = vapidKey !== localStorage.vapidKey
  localStorage.vapidKey = vapidKey
  return {vapidKey, modified}
}

module.exports = fetchVapidKey
