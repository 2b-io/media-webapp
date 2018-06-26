import React, { Fragment } from 'react'

import Layout, { LeftMenu, TopMenu } from 'views/layout'
import { HistoryProvider, Router } from 'views/router'
import { content, overlay, still, unauthRoutes } from 'views/route-config'
import { Nothing } from 'ui/elements'

const HEADER_HEIGHT = 0
const MENU_WIDTH = 44

const overlayRoutesPattern = Object.keys(unauthRoutes).join('|')

const render = {
  header: () => <TopMenu menuWidth={ MENU_WIDTH } />,
  overlay: ({ history }) => (
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
            path: `(${ overlayRoutesPattern })`,
            component: Nothing
          }
        ] }
        otherwise={ () => <LeftMenu width={ MENU_WIDTH } /> }
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
