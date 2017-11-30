import request from 'superagent'

export function head({ url }, { token } = { token: null }) {
  console.log(url, token)

  return request
    .head(url)
    .set('Authorization', token ? `Bearer ${token}` : '')
    .then(response => response.body)
}

export function get({ url }, { token } = { token: null }) {
  return request
    .get(url)
    .set('accept', 'json')
    .then(response => response.body)
}

export function post({ url, data }, { token } = { token: null }) {
  return request
    .post(url)
    .send(data)
    .set('accept', 'json')
    .set('Authorization', token ? `Bearer ${token}` : '')
    .then(response => response.body)
}

export function put({ url, data }, { token } = { token: null }) {
  return request
    .put(url)
    .send(data)
    .set('accept', 'json')
    .set('Authorization', token ? `Bearer ${token}` : '')
    .then(response => response.body)
}

export function del({ url }, { token } = { token: null }) {
  return request
    .del(url)
    .set('accept', 'json')
    .set('Authorization', token ? `Bearer ${token}` : '')
    .then(response => response.body)
}
