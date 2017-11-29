import mongoose from 'core/mongoose'

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  }
})

export default mongoose.model('Tenant', schema)
