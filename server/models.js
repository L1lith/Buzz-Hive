const mongoose = require('mongoose')
const schemas = require('require-directory')(module, './schemas', {recurse: false})
const S = require('string')
const mongooseOptions = require('./config').mongoose
const mongooseURI = mongooseOptions.URI
delete mongooseOptions.URI

async function createModels() {
  await mongoose.connect(mongooseURI, mongooseOptions)
  const output = {}
  const schemaEntries = Object.entries(schemas).forEach(([name, schema]) => {
      name = S(name).titleCase().s
      schema = new mongoose.Schema(schema)
      output[name] = mongoose.model(name, schema)
  })
  return output
}

module.exports = createModels
