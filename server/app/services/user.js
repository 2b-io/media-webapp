import User from 'models/User'

export function list() {
  return User.find().lean().exec()
}
