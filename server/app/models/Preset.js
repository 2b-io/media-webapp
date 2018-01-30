import shortHash from 'shorthash'
import mongoose from 'infrastructure/mongoose'

const HASH_DEFAULT = 'default'
const HASH_LENGTH = '8'

const generateHash = preset => {
  let hash = shortHash.unique(preset._id.toString())

  for (let i = hash.length; i < 6; i++) {
    hash = '_' + hash
  }

  return hash
}

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
    type: Boolean,
    default: false
  },
  hash: {
    type: String,
    required: true
  },
  removed: {
    type: Boolean,
    default: false,
    index: true
  }
})

schema.index({
  project: 1,
  hash: 1
}, {
  unique: true
})

schema.pre('validate', function(next) {
  try {
    if (!this.hash) {
      this.hash = this.isDefault ?
        HASH_DEFAULT :
        generateHash(this)
    }

    next()
  } catch (e) {
    next(e)
  }
})

export default mongoose.model('Preset', schema)
