import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  key: {
    type: String,
    required: true,
    index: true
  },
  description: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  collection: 'secretKeys'
})

schema.index({ project: 1, key: 1 }, { unique: true })

export default mongoose.model('SecretKey', schema)
