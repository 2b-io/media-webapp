import createHistory from 'history/createBrowserHistory'

import store from 'core/store'

const history = createHistory()

history.listen((location, action) => {
  store.dispatch({
    type: 'LOCATION_CHANGED',
    path: location.pathname
  })
})

store.dispatch({
  type: 'LOCATION_CHANGED',
  path: history.location.pathname
})

export default history
