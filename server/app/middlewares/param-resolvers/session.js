import jwt from 'jsonwebtoken'
import config from 'infrastructure/config'
import { findById as findAccountById } from 'services/account'

export default async (req) => {
  const authorizationHeader = req.get('Authorization')

  if (!authorizationHeader) {
    return
  }

  const token = authorizationHeader.replace('Bearer ', '')

  const decoded = jwt.verify(token, config.session.secret)

  const account = await findAccountById(decoded._id)

  return account
}
