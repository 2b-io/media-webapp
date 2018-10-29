import { stringToList } from 'services/string-to-list'
import isInvalidEmail from './email'

export default (emails) => {
  const invalidEmail = stringToList(emails).find(
    (email) => isInvalidEmail(email)
  )
  return invalidEmail ? 'Invalid email address' : undefined
}
