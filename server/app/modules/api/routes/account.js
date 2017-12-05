import {
  create as createAccount,
  list as listAllAccounts
} from '../controllers/account'

export default app => {
  app.get('/accounts', listAllAccounts)
  app.post('/accounts', createAccount)
}
