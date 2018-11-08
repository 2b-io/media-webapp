import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  project: [
    {
      type: String
    }
  ]
}, {
  collection: 'pinProject'
})

export default mongoose.model('PinProject', schema)
