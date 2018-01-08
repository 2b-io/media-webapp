import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import nprogress from 'nprogress'

import { accept, redirect, sync } from 'actions/routing'
import store from './store'

export default function(done) {
  let lastLocation = {}
  let isBooted = false

  const browserHistory = createBrowserHistory({
    initialEntries: ['/']
  })

  const memoryHistory = createMemoryHistory({
    initialEntries: ['/splash']
  })

  const select = state => select => select(state)

  const start = () => {
     // sync browserHistory with memoryHistory
      browserHistory.listen((location, type) => {
        store.dispatch(accept(location))
      })

      // begin
      store.dispatch(redirect(location.pathname))

      done(memoryHistory)
  }

  // listen redirecting, location
  store.subscribe(() => {
    const selectState = select(store.getState())

    const bootstrap = selectState(state => state.bootstrap)

    if (!isBooted && bootstrap) {
      isBooted = true
      start()
    }
  })

  store.subscribe(() => {
    const selectState = select(store.getState())

    const acceptLocation = selectState(state => state.routing.location)

    if (acceptLocation && acceptLocation !== lastLocation) {
      lastLocation = acceptLocation

      nprogress.done()
      memoryHistory.push(acceptLocation.pathname, acceptLocation.key)
    }

    const requestLocation = selectState(state => state.routing.request)

    if (requestLocation) {
      nprogress.start()
      store.dispatch(sync(requestLocation))
    }

    const syncLocation = selectState(state => state.routing.sync)

    if (syncLocation) {
      browserHistory.push(syncLocation.pathname, syncLocation.key)
    }
  })
}
