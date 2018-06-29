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
  salt: {
    type: Number,
  },
  removed: {
    type: Boolean,
    default: false,
    index: true
  }
})

schema.methods = {
  comparePassword({ plain, hashed }) {
    return bcrypt.compareSync(plain, hashed)
  },
}

schema.virtual('password').set(function(password) {
  this.salt = randomInt(8, 12)
  this.hashedPassword = bcrypt.hashSync(password, this.salt)
})

export default mongoose.model('Account', schema)
