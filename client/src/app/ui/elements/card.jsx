import React from 'react'
import styled, { css } from 'styled-components'

import { Break } from 'ui/elements'

const Wrapper = styled.section`
  background: #fff;
`

const Header = styled.div`
  position: relative;
  height: 40px;
  ${
    ({ hasFAB }) => hasFAB && css`
      padding-right: 64px;
    `
  }
`

const HeaderBorder = styled.div`
  position: absolute;
  height: 1px;
  left: 0;
  right: 0;
  background: #666;
  bottom: 0;
  z-index: 0;
`

const FAB = styled.button`
  position: absolute;
  right: 16px;
  bottom: -16px;
  z-index: 1;
  border: 1px solid #666;
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 40px;
  appearance: none;
  background: #fff;
`

const Content = styled.div`
`

const Card = ({ title, fab, content }) => (
  <Wrapper>
    <Header hasFAB={ !!fab }>
      { title && title() }
      { fab && <FAB>{ fab() }</FAB> }
      <HeaderBorder />
    </Header>
    <Break />
    <Content>
      { content && content() }
    </Content>
  </Wrapper>
)

export default Card
