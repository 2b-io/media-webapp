import React from 'react'

import Layout, { LeftMenu, TopMenu } from 'views/layout'
import { HistoryProvider, Redirect, Router } from 'views/router'
import { content, overlay, still } from 'views/pages'
import { Nothing } from 'ui/elements'

const render = {
  header: () => <TopMenu />,
  overlay: ({ history }) => (
    <Router
      animated
      history={ history }
      routes={ overlay }
      otherwise={
        () => <LeftMenu />
      }
    />
  ),
  content: ({ history }) => (
    <Router
      history={ history }
      routes={ content }
    />
  ),
  still: ({ history }) => (
    <Router
      history={ history }
      routes={ still }
    />
  )
}

const App = () => (
  <HistoryProvider>
    <Layout render={ render } />
  </HistoryProvider>
)

export default App
