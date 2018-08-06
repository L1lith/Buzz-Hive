async function fetchVapidKey() {
  const vapidKey = await (await fetch()).text()
  const modified = vapidKey === localStorage.vapidKey
  localStorage.vapidKey = vapidKey
  return {vapidKey, modified}
}

module.exports = getVapidKey
