import cryptoRandomString from 'crypto-random-string'
import crypto from 'crypto-js'
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
    type: String,
  },
  removed: {
    type: Boolean,
    default: false,
    index: true
  }
})

schema.methods = {
  hashPassword (password) {
    if (!password) return
    const cryp = crypto.AES.encrypt(String(password), String(this.salt))
    return cryp.toString()
  },
  comparePassword ({ plainText, salt, passwordHash }) {
    var bytes = crypto.AES.decrypt(passwordHash, salt)
    return plainText === bytes.toString(crypto.enc.Utf8)
  },
}

schema.virtual('password').set(function(password) {
  this._password = password
  this.salt = cryptoRandomString(10)
  this.hashedPassword = this.hashPassword({ password })
})

export default mongoose.model('Account', schema)
