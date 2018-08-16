import React from 'react'
import { connect } from 'react-redux'

import App from 'containers/App'
import HistoryProvider from 'containers/HistoryProvider'
import ReduxRouter from 'containers/ReduxRouter'

@connect(state => ({ bootstrap: state.bootstrap }))
class AppWrapper extends React.Component {
  render() {
    const { bootstrap } = this.props

    if (!bootstrap) return null

    return (
      <HistoryProvider>
        <ReduxRouter history={history}>
          <App />
        </ReduxRouter>
      </HistoryProvider>
    )
  }
}

export default AppWrapper
