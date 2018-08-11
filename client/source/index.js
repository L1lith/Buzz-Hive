import registerServiceWorker from './registerServiceWorker'
import setupCustomFetchBehavior from './functions/customFetchBehavior'

setupCustomFetchBehavior()

registerServiceWorker().then(()=>{}).catch(console.log)
