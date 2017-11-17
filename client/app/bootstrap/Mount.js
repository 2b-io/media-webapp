import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import Router from 'bootstrap/Router'
import App from 'containers/App'

import store from 'bootstrap/store'

class Mount extends React.Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <Router component={App} />
      </ReduxProvider>
    )
  }
}

export default Mount
