const baseScripts = require('require-directory')(module)

async function runScripts(kind, scripts=baseScripts) {
  const output = {}
  if (typeof scripts != 'object' || scripts === null) return output
  const scriptEntries = Object.entries(scripts)
  for (let i = 0; i < scriptEntries.length; i++) {
    const [key, value] = scriptEntries[i]
    if (typeof value == 'object' && value !== null) {
      Object.assign(output, await runScripts(kind, value))
    } else if (key === kind && typeof value == 'function') {
      const functionOutput = await value()
      if (typeof functionOutput == 'object' && functionOutput !== null) {
        Object.assign(output, functionOutput)
      }
    }
  }
  return output
}

module.exports = runScripts
