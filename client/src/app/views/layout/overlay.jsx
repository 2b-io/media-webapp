import React from 'react'
import styled from 'styled-components'

import { Button, Identicon } from 'ui/elements'
import { GithubIcon } from 'ui/icons'

const StyledOverlay = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  bottom: 0;
  transition: width 1.2s cubic-bezier(.4, 0, .2, 1), background 1.2s cubic-bezier(.4, 0, .2, 1), color 1.2s cubic-bezier(.4, 0, .2, 1);
  align-center: center;
  justify-content: center;
  width: ${
    ({ shown, width }) => shown ? '100%' : `${ width }px`
  };
  padding-top: ${
    ({ headerHeight }) => `${ headerHeight }px`
  };
  background-color: ${
    ({ shown, theme }) => shown ? theme.background.base : theme.primary.base
  };
  color: ${
    ({ shown, theme }) => shown ? theme.background.on.base : theme.primary.on.base
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Header = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  text-align: center;
  transition: opacity 1.2s cubic-bezier(.4, 0, .2, 1);
  margin-left: -14px;
  margin-right: -14px;
  opacity: ${
    ({ shown }) => shown ? 0 : 1
  };
`

const Content = styled.div`
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
`

const Footer = styled.div`
  background: ${ ({ theme }) => theme.secondary.base };
  color: ${ ({ theme }) => theme.secondary.on.base };
  text-align: center;
  padding: 10px;
`

const Overlay = ({
  children,
  shown,
  headerHeight,
  width,
  toProfile,
  email
}) => (
  <StyledOverlay
    shown={ shown }
    headerHeight={ headerHeight }
    width={ width }>
    <Wrapper>
      <Header shown={ shown }>
        <Button plain onClick={ toProfile }>
          <Identicon
            circle
            size={ 64 }
            id={ email }
          />
        </Button>
      </Header>
      <Content>
        { children }
      </Content>
      <Footer>
        <GithubIcon size="medium" />
      </Footer>
    </Wrapper>
  </StyledOverlay>
)

export default Overlay
