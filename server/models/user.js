module.exports = {
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  displayName: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  banned: {
    type: Boolean,
    required: true,
    default: false
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  verificationCode: {
    type: String,
    required: false
  },
  devices: {
    type: [{
      name: String,
      pushURL: String
    }],
    required: false
  }
}
