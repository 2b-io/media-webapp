import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { selectors } from 'state/interface'
import { HistoryProvider, Redirect, Router } from 'views/router'
import Layout, { LeftMenu, TopMenu } from 'views/layout'

import SignIn from 'views/pages/sign-in'

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
  header: ({ isSignedIn }) => {
    if (!isSignedIn) {
      return null
    }

    return <TopMenu />
  },
  overlay: ({ history, isSignedIn }) => {
    const render = requireSignedOut(isSignedIn)

    console.log('xxx', isSignedIn)

    if (isSignedIn) {
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
  content: ({ history, isSignedIn }) => {
    const render = requireSignedIn(isSignedIn)

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
  still: ({ history, isSignedIn }) => {
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
    isSignedIn: selectors.isSignedIn(state)
  })
)(Layout)

const App = ({ isSignedIn }) => (
  <HistoryProvider>
    <ConnectedLayout
      isSignedIn={ isSignedIn }
      render={ render }
    />
  </HistoryProvider>
)

export default App
