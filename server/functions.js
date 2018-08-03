const functionArguments = require('function-arguments')
const functions = require('require-directory')(module, './functions', {recursive: false})

async function getFunctions(data) {
  const output = {}
  const functionEntries = Object.entries(functions)
  for (let i = 0; i < functionEntries.length; i++) {
    const [name, setupFunction] = functionEntries[i]
    const args = functionArguments(setupFunction)
    let func = null
    if (args.length === 1 && args[0] === 'data') {
      func = setupFunction(data)
      if (func instanceof Promise) func = await func
    } else {
      func = setupFunction
    }
    if (typeof func != 'function') throw new Error(`Expected Function for "${name}"`)
    output[name] = func
  }
  return output
}

module.exports = getFunctions
