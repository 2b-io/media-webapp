import React from 'react'
import { connect } from 'react-redux'

import { selectors } from 'state/interface'
import { HistoryProvider, Redirect, Router } from 'views/router'
import Layout from 'views/layout'

const requireSignedIn = isSignedIn => renderFunc => {
  return isSignedIn ?
    renderFunc :
    () => <Redirect to="/sign-in" />
}

const requireSignedOut = isSignedIn => renderFunc => {
  return isSignedIn ?
    () => <Redirect to="/" /> :
    renderFunc
}

const render = {
  header: ({ history }) => (
    <h1>Header</h1>
  ),
  overlay: ({ history, isSignedIn }) => {
    const render = requireSignedOut(isSignedIn)

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
            component: render(() => <h1>Sign in</h1>)
          }
        ] }
        otherwise={
          () => <h1>Menu</h1>
        }
      />
    )
  },
  content: ({ history, isSignedIn }) => {
    const render = requireSignedIn(isSignedIn)

    return (
      <Router
        history={ history }
        routes={ [
          {
            path: '/',
            exact: true,
            component: render(() => <h1>Dashboard content</h1>)
          }
        ] }
        otherwise={
          () => null
        }
      />
    )
  },
  still: ({ history, isSignedIn }) => {
    const render = requireSignedIn(isSignedIn)

    return (
      <Router
        history={ history }
        routes={ [
          {
            path: '/',
            exact: true,
            component: render(() => <h1>Dashboard</h1>)
          }
        ] }
        otherwise={
          () => null
        }
      />
    )
  }
}

const App = ({ isSignedIn }) => (
  <HistoryProvider>
    <Layout
      isSignedIn={ isSignedIn }
      render={ render }
    />
  </HistoryProvider>
)

export default connect(
  state => ({
    isSignedIn: selectors.isSignedIn(state)
  })
)(App)
