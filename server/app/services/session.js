import jwt from 'jsonwebtoken'
import User from 'models/User'

const SECRET = 'xxx'

export function create({ email, password }) {
  return User.
    findOne({
      email
    })
    .lean()
    .exec()
    .then(user => {
      console.log(user)

      if (!user) {
        throw new Error('Invalid email')
      }

      const payload = {
        _id: user._id
      }

      const token = jwt.sign(payload, SECRET, {
        expiresIn: '1h'
      })

      return { token }
    })
}
