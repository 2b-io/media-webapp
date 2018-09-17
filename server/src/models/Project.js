import sh from 'shorthash'
import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  identifier: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: String
  },
  removed: {
    type: Boolean,
    default: false,
    index: true
  }
})
schema.pre('save', function (next) {
  this.identifier = sh.unique(String(this._id))
  next()
})
export default mongoose.model('Project', schema)
