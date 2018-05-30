import React, { Fragment } from 'react'

import Layout, { LeftMenu, TopMenu } from 'views/layout'
import { HistoryProvider, Redirect, Router, Switch } from 'views/router'
import { content, overlay, still } from 'views/pages'
import { Identicon, Nothing } from 'ui/elements'

import styled from 'styled-components'

const HEADER_HEIGHT = 70
const MENU_WIDTH = 100

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Header = styled.div`
  padding: 20px;
  text-align: center;
`

const Content = styled.div`
  flex-grow: 1;
`

const Footer = styled.div`
  background: whitesmoke;
  text-align: center;
`

const render = {
  header: () => <TopMenu />,
  overlay: ({ isLayoutClosed, history }) => (
    <Wrapper>
      <Header>
        <Identicon size={ 60 } id={ 'd@dapps.me' } circle />
      </Header>
      <Content>
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
      </Content>
      <Footer>
        <h1>Footer</h1>
      </Footer>
    </Wrapper>
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
