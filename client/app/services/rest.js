import Promise from 'bluebird'

export function get() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ username: 'demo' }), 1e3)
  })
}

export function post() {}

export function put() {}

export function del() {}
