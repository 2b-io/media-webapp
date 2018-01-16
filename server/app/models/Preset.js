import shortHash from 'shorthash'
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
  },
  isDefault: {
    default: false
  },
  hash: {
    type: String,
    required: true,
    unique: true
  }
})

schema.pre('validate', function(next) {
  try {
    if (!this.hash) {
      this.hash = shortHash.unique(this._id.toString())
    }

    next()
  } catch (e) {
    next(e)
  }
})

export default mongoose.model('Preset', schema)
