import React, { Component } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from 'state-manager'

import { HistoryManager } from 'core/history-manager'
import { Layout } from 'core/layout'
import { Router } from 'core/router'

export default class Core extends Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <HistoryManager>
          <Layout />
        </HistoryManager>
      </ReduxProvider>
    )
  }
}
