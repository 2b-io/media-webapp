import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  expired: String,
  removed: {
    type: Boolean,
    default: false,
    index: true
  }
})

export default mongoose.model('ForgotPassword', schema)
