import React, { Component } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import HistoryProvider from 'containers/HistoryProvider'
import Router from 'containers/Router'

import store from 'redux/store'

export default class App extends Component {
  componentDidMount() {
    console.log('componentDidMount')
  }

  render() {
    return (
      <ReduxProvider store={store}>
        <HistoryProvider>
          <Router />
        </HistoryProvider>
      </ReduxProvider>
    )
  }
}
