const registerServiceWorker = require('./registerServiceWorker')
require('./functions/customFetchBehavior')()

registerServiceWorker().then(()=>{}).catch(console.log)
