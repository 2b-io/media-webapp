import React from 'react'

import { HistoryProvider, Redirect, Router } from 'views/router'
import Layout, { LeftMenu, TopMenu } from 'views/layout'

import SignIn from 'views/pages/sign-in'
import Dashboard from 'views/pages/dashboard'

const render = {
  header: () => <TopMenu />,
  overlay: ({ history }) => (
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
        () => <LeftMenu />
      }
    />
  ),
  content: ({ history }) => (
    <Router
      history={ history }
      routes={ [
        {
          path: '/',
          exact: true,
          component: Dashboard
        }
      ] }
      otherwise={
        () => null
      }
    />
  ),
  still: ({ history }) => (
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

const App = () => (
  <HistoryProvider>
    <Layout
      render={ render }
    />
  </HistoryProvider>
)

export default App
