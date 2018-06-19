import React, { Fragment } from 'react'

import Layout, { LeftMenu, TopMenu } from 'views/layout'
import { HistoryProvider, Redirect, Router, Switch } from 'views/router'
import { content, overlay, still } from 'views/route-config'
import { Nothing } from 'ui/elements'

const HEADER_HEIGHT = 0
const MENU_WIDTH = 44

const render = {
  header: () => <TopMenu menuWidth={ MENU_WIDTH } />,
  overlay: ({ isLayoutClosed, history }) => (
    <Fragment>
      <Router
        animated="slide"
        history={ history }
        routes={ overlay }
      />
      <Router
        animated="fade"
        history={ history }
        routes={ [
          {
            path: '/(sign-in|register|forgot-password|reset-password)',
            component: Nothing
          }
        ] }
        otherwise={
          () => <LeftMenu width={ MENU_WIDTH } />
        }
      />
    </Fragment>
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
      menuWidth={ MENU_WIDTH }
      headerHeight={ HEADER_HEIGHT }
    />
  </HistoryProvider>
)

export default App
