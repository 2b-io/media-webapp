import React, { Fragment } from 'react'

import Layout, { LeftMenu, TopMenu } from 'views/layout'
import { HistoryProvider, Redirect, Router, Switch } from 'views/router'
import { content, overlay, still } from 'views/pages'
import { Identicon, Nothing } from 'ui/elements'

import styled from 'styled-components'

const HEADER_HEIGHT = 70
const MENU_WIDTH = 100

const CenterBox = styled.div`
  padding: 20px;
  width: ${ MENU_WIDTH }px;
  margin: auto;
`

const render = {
  header: () => <TopMenu />,
  overlay: ({ isLayoutClosed, history }) => (
    <Fragment>
      <CenterBox>
        <Identicon size={ 60 } id={ 'd@dapps.me' } circle />
      </CenterBox>
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
