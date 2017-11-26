import request from 'superagent'

function create(credential) {
  return request
    .post('/api/sessions')
    .send(credential)
}

export default {
  create
}
