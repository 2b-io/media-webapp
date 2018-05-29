import storage from 'localforage'

storage.config({
  driver: storage.LOCALSTORAGE,
  name: 'media-on-demand',
  storeName: 'webapp'
})

export function get(key) {
  return storage.getItem(key)
}

export function set(key, value) {
  return storage.setItem(key, value)
}

export function clear(key) {
  return storage.removeItem(key)
}
