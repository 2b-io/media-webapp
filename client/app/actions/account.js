import { ajax } from 'helpers/ajax'
import prefix from 'helpers/prefix-map'

export const ACCOUNT = prefix('account', {
  ...ajax('CREATE')
})

export function registerAccount(account) {
  return {
    type: ACCOUNT.CREATE_REQUEST,
    payload: account
  }
}
