import React, { Fragment } from 'react'

import Layout, { LeftMenu, TopMenu } from 'views/layout'
import { HistoryProvider, Redirect, Router, Switch } from 'views/router'
import { content, overlay, still } from 'views/pages'
import { Nothing } from 'ui/elements'

const HEADER_HEIGHT = 50
const MENU_WIDTH = 120

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
            path: '/sign-*',
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
