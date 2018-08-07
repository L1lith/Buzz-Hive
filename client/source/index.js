const registerServiceWorker = require('./registerServiceWorker')
require('./functions/fetchSupportJSON')()

registerServiceWorker().then(()=>{}).catch(console.log)
