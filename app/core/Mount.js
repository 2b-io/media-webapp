import React from 'react'

import AppRouter from 'core/AppRouter'

// redux
import { Provider } from 'react-redux'

import store from 'core/store'

class Mount extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    )
  }
}

export default Mount
