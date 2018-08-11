module.exports = {
  subscription: {
    type: {
      endpoint: {
        type: String,
        required: true
      },
      keys: {
        type: {
          auth: {
            type: String,
            required: true,
          },
          p256dh: {
            type: String,
            required: true
          }
        },
        required: true
      }
    },
    required: true
  },
  owner: {
    type: String,
    required: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
}
