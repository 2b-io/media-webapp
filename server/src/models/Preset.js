import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  contentType: {
    type: String
  },
  parameters: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { minimize: false })

export default mongoose.model('Preset', schema)
