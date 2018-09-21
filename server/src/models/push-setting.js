import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  secretKeys: [
    {
      key: String,
      description: String,
      isActive: Boolean
    }
  ]
})

export default mongoose.model('PushSetting', schema)
