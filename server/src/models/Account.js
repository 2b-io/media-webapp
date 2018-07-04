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
  removed: {
    type: Boolean,
    default: false,
    index: true
  }
})

schema.methods = {
  comparePassword(plain) {
    return bcrypt.compareSync(plain, this.hashedPassword)
  },
}

schema.virtual('password').set(function(password) {
  const salt = randomInt(8, 12)
  this.hashedPassword = bcrypt.hashSync(password, salt)
})

export default mongoose.model('Account', schema)
