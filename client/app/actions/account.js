import { ajax } from 'helpers/ajax'
import prefix from 'helpers/prefix-map'

import { KEYWORDS } from 'actions/ajax'

export const ACCOUNT = prefix('account', {
  ...ajax('CREATE')
})

export function registerAccount(account) {
  return {
    type: ACCOUNT.CREATE_REQUEST,
    payload: account,
    [KEYWORDS.ID]: 'register'
  }
}
