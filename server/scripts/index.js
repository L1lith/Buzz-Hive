const baseScripts = require('require-directory')(module)
const merge = require('merge-objects')

async function runScripts(kind, scripts=baseScripts) {
  let output = {}
  if (typeof scripts != 'object' || scripts === null) return output
  const scriptEntries = Object.entries(scripts)
  for (let i = 0; i < scriptEntries.length; i++) {
    const [key, value] = scriptEntries[i]
    if (typeof value == 'object' && value !== null) {
      output = merge(output, await runScripts(kind, value))
    } else if (key === kind && typeof value == 'function') {
      const functionOutput = await value()
      if (typeof functionOutput == 'object' && functionOutput !== null) {
        output = merge(output, functionOutput)
      }
    }
  }
  return output
}

module.exports = runScripts
