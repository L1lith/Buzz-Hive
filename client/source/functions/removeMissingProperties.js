function removeMissingProperties(object, deep=true) {
  const newObject = {}
  const properties = Object.getOwnPropertyNames(object)
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i]
    const value = object[property]
    if (value === null || value === undefined) {
      // Do Nothing
    } else if (deep === true && typeof value == 'object') {
      newObject[property] = removeMissingProperties(value, deep)
    } else {
      newObject[property] = value
    }
  }
  return newObject
}

export default removeMissingProperties
