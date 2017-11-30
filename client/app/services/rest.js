import request from 'superagent'

export function get({ url }) {
  return request
    .post(url)
    .set('accept', 'json')
}

export function post({ url, data }) {
  return request
    .post(url)
    .send(data)
    .set('accept', 'json')
}

export function put({ url, data }) {
  return request
    .put(url)
    .send(data)
    .set('accept', 'json')
}

export function del({ url }) {
  return request
    .del(url)
    .set('accept', 'json')
}
