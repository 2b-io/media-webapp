import React from 'react'
import styled from 'styled-components'

import { GithubIcon } from 'ui/icons'

import { Identicon, Nothing } from 'ui/elements'

const StyledOverlay = styled.div`
  position: fixed;
  background-color: whitesmoke;
  z-index: 2;
  top: 0;
  left: 0;
  bottom: 0;
  transition: width 1.2s cubic-bezier(.4, 0, .2, 1);
  align-center: center;
  justify-content: center;
  overflow: hidden;
  width: ${
    ({ shown, width }) => shown ? '100%' : `${ width }px`
  };
  padding-top: ${
    ({ headerHeight }) => `${ headerHeight }px`
  };
  border: 1px solid #333;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Header = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  transition: opacity 1.2s cubic-bezier(.4, 0, .2, 1);
  opacity: ${
    ({ shown }) => shown ? 0 : 1
  };
`

const Content = styled.div`
  flex-grow: 1;
`

const Footer = styled.div`
  background: #333;
  text-align: center;
  padding: 10px;
`

const Overlay = ({ children, shown, headerHeight, width }) => (
  <StyledOverlay
    shown={ shown }
    headerHeight={ headerHeight }
    width={ width }>
    <Wrapper>
      <Header shown={ shown }>
        <Identicon size={ 48 } id={ 'd@dapps.me' } circle />
      </Header>
      <Content>
        { children }
      </Content>
      <Footer>
        <GithubIcon inverted />
      </Footer>
    </Wrapper>
  </StyledOverlay>
)

export default Overlay
