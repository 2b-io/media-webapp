import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { selectors } from 'state/interface'
import { HistoryProvider, Redirect, Router } from 'views/router'
import Layout, { LeftMenu, TopMenu } from 'views/layout'

import SignIn from 'views/pages/sign-in'

const render = {
  header: ({ isLayoutClosed }) => {
    return <TopMenu />
  },
  overlay: ({ history, isLayoutClosed }) => {
    if (!isLayoutClosed) {
      return <LeftMenu />
    }

    return (
      <Router
        history={ history }
        routes={ [
          {
            path: '/splash',
            exact: true,
            component: () => <h1>Loading...</h1>
          },
          {
            path: '/sign-in',
            exact: true,
            component: SignIn
          }
        ] }
        otherwise={
          () => null
        }
      />
    )
  },
  content: ({ history, isLayoutClosed }) => {
    return (
      <Router
        history={ history }
        routes={ [
          {
            path: '/',
            exact: true,
            component: () => <h1>Dashboard content</h1>
          }
        ] }
        otherwise={
          () => null
        }
      />
    )
  },
  still: ({ history, isLayoutClosed }) => {
    return (
      <Router
        history={ history }
        routes={ [
          {
            path: '/',
            exact: true,
            component: () => <h1>Dashboard</h1>
          }
        ] }
        otherwise={
          () => null
        }
      />
    )
  }
}

const ConnectedLayout = connect(
  state => ({
    isLayoutClosed: selectors.isLayoutClosed(state)
  })
)(Layout)

const App = () => (
  <HistoryProvider>
    <ConnectedLayout
      render={ render }
    />
  </HistoryProvider>
)

export default App
