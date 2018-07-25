import React, { Fragment } from 'react'
import { injectGlobal, ThemeProvider } from 'styled-components'

import Layout, { LeftMenu } from 'views/layout'
import { HistoryProvider, Router } from 'views/router'
import { content, overlay, still, unauthRoutes } from 'views/route-config'
import defaultTheme from 'views/themes/default'
import { Nothing } from 'ui/elements'

injectGlobal`
  body {
    background: ${ defaultTheme.primary.base };
    color: ${ defaultTheme.primary.on.base};
  }

  ::-webkit-scrollbar {
    width: ${ defaultTheme.spacing.small };
  }

  ::-webkit-scrollbar-track {
    background: ${ defaultTheme.secondary.limpid.base };

    &:hover {
      background: ${ defaultTheme.secondary.light.base };
    }

    &:active {
      background: ${ defaultTheme.secondary.dark.base };
    }
  }

  ::-webkit-scrollbar-thumb {
    background: ${ defaultTheme.primary.base };

    &:hover {
      background: ${ defaultTheme.primary.light.base };
    }

    &:active {
      background: ${ defaultTheme.primary.dark.base };
    }
  }
`

const overlayRoutesPattern = Object.keys(unauthRoutes)
  .map(p => p.split(':')[0] + '*')
  .join('|')

const Overlay = ({ history, width }) => (
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
      otherwise={ () => <LeftMenu width={ width } /> }
    />
  </Fragment>
)

const Content = ({ history }) => (
  <Router
    history={ history }
    routes={ content }
  />
)

const Still = ({ history }) => (
  <Router
    history={ history }
    routes={ still }
  />
)

const render = {
  overlay: Overlay,
  content: Content,
  still: Still
}

const App = () => (
  <ThemeProvider theme={ defaultTheme }>
    <HistoryProvider>
      <Layout render={ render } />
    </HistoryProvider>
  </ThemeProvider>
)

export default App
