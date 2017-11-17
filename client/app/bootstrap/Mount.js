import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'

// import History from 'components/History'
import Router from 'bootstrap/Router'
import Layout from 'containers/Layout'

import store from 'bootstrap/store'

class Mount extends React.Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <Router component={Layout} />
      </ReduxProvider>
    )
  }
}

export default Mount
