import sh from 'shorthash'
import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  identifier: String,
  description: String,
  prettyOrigin: String,
  status: String,
  origins: [ String ],
  headers: [ { name: String, value: String } ],
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
