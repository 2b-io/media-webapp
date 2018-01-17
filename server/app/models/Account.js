import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  removed: {
    type: Boolean,
    default: false,
    index: true
  }
})

export default mongoose.model('Account', schema)
