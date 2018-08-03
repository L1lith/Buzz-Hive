module.exports = {
  owner: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    expires: 30 * 24 * 60 * 60,
    default: Date.now,
    required: true
  },
  _id: {
    type: String,
    required: true
  }
}
