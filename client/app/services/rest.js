import request from 'superagent'

export function get({ url }) {
  return request
    .post(url)
    .set('accept', 'json')
    .then(response => response.body)
}

export function post({ url, data }) {
  return request
    .post(url)
    .send(data)
    .set('accept', 'json')
    .then(response => response.body)
}

export function put({ url, data }) {
  return request
    .put(url)
    .send(data)
    .set('accept', 'json')
    .then(response => response.body)
}

export function del({ url }) {
  return request
    .del(url)
    .set('accept', 'json')
    .then(response => response.body)
}
