import {
  list as listAllUsers
} from '../controllers/user'

export default app => {
  app.get('/users', listAllUsers)
}
