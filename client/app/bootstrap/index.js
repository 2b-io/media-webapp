import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import { bootstrap } from 'actions/bootstrap'
import AppWrapper from 'containers/AppWrapper'
import store from './store'

class Bootstrap extends React.Component {
  componentDidMount() {
    store.dispatch(bootstrap())
  }

  render() {
    return (
      <ReduxProvider store={store}>
        <AppWrapper />
      </ReduxProvider>
    )
  }
}

export default Bootstrap
