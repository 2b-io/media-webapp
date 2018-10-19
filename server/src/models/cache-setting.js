import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  expired: {
    type: Number
  }
}, {
  collection: 'cacheSetting'
})

export default mongoose.model('cacheSetting', schema)
