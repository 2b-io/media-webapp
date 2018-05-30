import React from 'react'

import Layout, { LeftMenu, TopMenu } from 'views/layout'
import { HistoryProvider, Redirect, Router } from 'views/router'
import { content, overlay, still } from 'views/pages'
import { Nothing } from 'ui/elements'

const FullScreen = ({ history }) => (
  <Router
    animated="slide"
    history={ history }
    routes={ overlay }
  />
)

const config = history => [
  {
    path: '/sign-*',
    component: () => <FullScreen history={ history } />
  }
]


const render = {
  header: () => <TopMenu />,
  overlay: ({ history }) => (
    <Router
      animated="fade"
      history={ history }
      routes={ config(history) }
      otherwise={ () => <LeftMenu width={ 50 } /> }
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
    <Layout render={ render }
      menuWidth={ 50 }
      headerHeight={ 70 }
    />
  </HistoryProvider>
)

export default App
