import React from 'react'

import Router from 'components/Router'

// redux
import { Provider } from 'react-redux'

import history from 'core/history'
import store from 'core/store'
import { routes } from 'core/routing'

class Mount extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router routes={routes} history={history} />
      </Provider>
    )
  }
}

export default Mount
