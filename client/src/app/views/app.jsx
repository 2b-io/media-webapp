import React from 'react'
import { injectGlobal, ThemeProvider } from 'styled-components'

import Layout from 'views/layout'
import { HistoryProvider, Router } from 'views/router'
import { content, overlay, still } from 'views/route-config'
import defaultTheme from 'views/themes/default'

injectGlobal`
  /*
  body {
    background: ${ defaultTheme.primary.base };
    color: ${ defaultTheme.primary.on.base};
  }
  */

  #root {
    position: relative;
    height: 100%;
    min-height: 100%;
    font-size: 14px;
  }

  /*
  ::-webkit-scrollbar {
    width: ${ defaultTheme.spacing.tiny };
  }

  ::-webkit-scrollbar-track {
    background: ${ defaultTheme.secondary.base };

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
  */
`

const Overlay = ({ history, ...props }) => (
  <Router
    history={ history }
    routes={ overlay }
    { ...props }
  />
)

const Content = ({ history, ...props }) => (
  <Router
    history={ history }
    routes={ content }
    { ...props }
  />
)

const Still = ({ history, ...props }) => (
  <Router
    history={ history }
    routes={ still }
    { ...props }
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
