function subscribe(worker, vapidKey) {
  return worker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: vapidKey
  })
}

export default subscribe
