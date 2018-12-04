import { Account } from '../account'

import createAccountService from 'services/account'

export default () => ({
  account: {
    type: Account,
    resolve: async (collaborator, args, ctx) => {
      const accountService = createAccountService(ctx._session.account.identifier)

      return await accountService.findByIdentifier(collaborator.accountIdentifier)
    }
  }
})
