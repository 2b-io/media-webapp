import storage from 'localforage'

storage.config({
  driver: storage.LOCALSTORAGE,
  name: 'media-on-demand',
  storeName: 'webapp'
})

export default {
  get: key => storage.getItem(key),
  set: (key, value) => storage.setItem(key, value),
  clear: key => storage.removeItem(key)
}
