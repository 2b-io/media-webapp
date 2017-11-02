import React from 'react'
import { Provider } from 'react-redux'

import History from 'components/History'
import Router from 'components/Router'

import store from 'core/store'
import { routes } from 'core/routing'

class Mount extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <History>
          <Router routes={routes} />
        </History>
      </Provider>
    )
  }
}

export default Mount
