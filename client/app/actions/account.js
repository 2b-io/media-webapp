import prefix from 'helpers/prefix-map'

export const ACCOUNT = prefix('account', {
  CREATE_REQUEST: 'CREATE_REQUEST',
  CREATE_SUCCESS: 'CREATE_SUCCESS',
  CREATE_FAILURE: 'CREATE_FAILURE'
})

export function registerAccount(account) {
  return {
    type: ACCOUNT.CREATE_REQUEST,
    payload: account,
  }
}
