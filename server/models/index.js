const mongoose = require('mongoose')
const schemas = require('require-directory')(module, {recurse: false})
const S = require('string')
const mongoOptions = require('../config').mongo
const mongoURI = "mongodb://" + mongoOptions.host + ":" + mongoOptions.port + '/' + mongoOptions.db
delete mongoOptions.host
delete mongoOptions.port
delete mongoOptions.db

async function createModels() {
  await mongoose.connect(mongoURI, mongoOptions)
  const output = {}
  const schemaEntries = Object.entries(schemas).forEach(([name, schema]) => {
      name = S(name).titleCase().s
      schema = new mongoose.Schema(schema)
      output[name] = mongoose.model(name, schema)
  })
  return output
}

module.exports = createModels
