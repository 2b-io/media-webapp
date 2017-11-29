import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  superUser: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model('User', schema)
