import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  code: {
    type: String,
    unique: true
  },
  expired: String,
  used: {
    type: Boolean,
    default: false,
    index: true
  }
})

export default mongoose.model('ResetPasswordCode', schema)
// ResetPasswordCode
