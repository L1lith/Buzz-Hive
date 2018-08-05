const registerServiceWorker = require('./registerServiceWorker')

async function run() {
  await (await registerServiceWorker()).pushManager.subscribe()
}

run().then(()=>{}).catch(console.log)
