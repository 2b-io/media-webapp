import bcrypt from 'bcrypt'
import randomInt from 'random-int'

import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: 'Anonymous',
    required: true
  },
  removed: {
    type: Boolean,
    default: false,
    index: true
  },
  isActive: {
    type: Boolean,
    default: false,
    index: true
  }
})
schema.index({ email: 'text' })
schema.methods = {
  comparePassword(plain) {
    return bcrypt.compareSync(plain, this.hashedPassword)
  },
}

schema.virtual('password').set(function(password) {
  this.hashedPassword = hashPassword(password)
})

export const hashPassword = (plainPassword) => {
  const salt = randomInt(8, 12)
  return bcrypt.hashSync(plainPassword, salt)
}

export default mongoose.model('Account', schema)
