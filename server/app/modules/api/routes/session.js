import {
  create as createSession
} from '../controllers/session'

export default app => {
  app.post('/sessions', createSession)
}
