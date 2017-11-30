import Promise from 'bluebird'
import request from 'superagent'

export function get() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ username: 'demo' }), 1e3)
  })
}

export function post({ url, data }) {
  return request
    .post(url)
    .send(data)
    .set('accept', 'json')
}

export function put() {}

export function del() {}
