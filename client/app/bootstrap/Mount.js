import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import Router from 'bootstrap/Router'
import App from 'containers/App'

class Mount extends React.Component {
  render() {
    const { history, store } = this.props

    return (
      <ReduxProvider store={store}>
        <Router history={history} component={App} />
      </ReduxProvider>
    )
  }
}

export default Mount
