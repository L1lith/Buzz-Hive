module.exports = {
  pushURL: {
    type: String,
    unique: true,
    required: true
  },
  owner: {
    type: String,
    required: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
}
