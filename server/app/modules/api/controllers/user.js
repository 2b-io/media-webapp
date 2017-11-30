import {
  list as listAllUsers
} from 'services/user'

export function list(req, res, next) {
  listAllUsers()
    .then(users => res.json(users))
    .catch(e => next(e))
}
