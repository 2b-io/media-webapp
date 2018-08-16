import { Account } from '../Account'

import {
  findById as findAccountById
} from 'services/account'

export default () => ({
  account: {
    type: Account,
    resolve: async (collaborator) => {
      return await findAccountById(collaborator.account)
    }
  }
})
