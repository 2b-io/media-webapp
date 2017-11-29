import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

export default mongoose.model('User', schema)
