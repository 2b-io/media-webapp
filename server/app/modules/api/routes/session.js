import {
  create as createSession,
  verify as verifySession
} from '../controllers/session'

export default app => {
  app.head('/sessions', (req, res, next) => {
    setTimeout(() => next(), 500)
  }, verifySession)
  app.post('/sessions', createSession)
}
