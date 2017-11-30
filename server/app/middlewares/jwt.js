import jwt from 'jsonwebtoken'

const SECRET = 'xxx'

export function parseJWT(req, res, next) {
  const authorization = req.get('Authorization')

  if (!authorization) {
    return next()
  }

  const token = authorization.replace('Bearer ', '')

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return next()
    }

    req.decoded = decoded

    next()
  })
}
