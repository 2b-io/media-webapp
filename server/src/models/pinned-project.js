import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  projects: [ {
    type: String
  } ]
}, {
  collection: 'pinnedProjects'
})

export default mongoose.model('PinnedProject', schema)
