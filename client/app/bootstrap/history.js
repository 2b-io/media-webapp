import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'

import { accept } from 'actions/routing'
import store from './store'

console.log('y')

let lastLocation = null

const browserHistory = createBrowserHistory({
  initialEntries: ['/']
})

const memoryHistory = createMemoryHistory({
  initialEntries: ['/splash']
})

const select = state => select => select(state)

// listen redirecting, location
store.subscribe(() => {
  const selectState = select(store.getState())

  const location = selectState(state => state.routing.location)

  if (location && location !== lastLocation) {
    lastLocation = location

    memoryHistory.push(location.pathname, location.state)
  }

  const redirecting = selectState(state => state.routing.redirecting)

  if (redirecting) {
    browserHistory.push(redirecting)
  }
})

// sync browserHistory with memoryHistory
browserHistory.listen((location, type) => {
  store.dispatch(accept(location))
})

// begin
store.dispatch(accept(location))

export default memoryHistory
