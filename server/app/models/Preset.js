import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  values: {
    quality: {
      type: Number,
      default: 75
    },
    step: {
      type: Number,
      default: 8
    }
  }
})

export default mongoose.model('Preset', schema)
