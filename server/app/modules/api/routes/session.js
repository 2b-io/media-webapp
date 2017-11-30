import {
  create as createSession,
  verify as verifySession
} from '../controllers/session'

export default app => {
  app.head('/sessions', verifySession)
  app.post('/sessions', createSession)
}
