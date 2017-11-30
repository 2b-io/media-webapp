import request from 'superagent'

export function head({ url }, { token = null }) {
  return request
    .head(url)
    .then(response => response.body)
}

export function get({ url }, { token = null }) {
  return request
    .get(url)
    .set('accept', 'json')
    .then(response => response.body)
}

export function post({ url, data }, { token = null }) {
  return request
    .post(url)
    .send(data)
    .set('accept', 'json')
    .then(response => response.body)
}

export function put({ url, data }, { token = null }) {
  return request
    .put(url)
    .send(data)
    .set('accept', 'json')
    .then(response => response.body)
}

export function del({ url }, { token = null }) {
  return request
    .del(url)
    .set('accept', 'json')
    .then(response => response.body)
}
