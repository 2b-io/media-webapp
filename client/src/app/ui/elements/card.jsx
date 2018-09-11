import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'

import { Break } from 'ui/elements'

const Wrapper = styled.section`
  background: #fff;
`

const Header = styled.div`
  position: relative;
  height: 40px;
  ${
    ({ hasFab }) => hasFab && css`
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

const Fab = styled.button`
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
  outline: none;
`

const Content = styled.div`
`

const Card = ({ title, fab, content, ...props }) => (
  <Wrapper { ...props }>
    { title && (
      <Fragment>
        <Header hasFab={ !!fab }>
          { title && title() }
          { fab && <Fab>{ fab() }</Fab> }
          <HeaderBorder />
        </Header>
        <Break />
      </Fragment>
    ) }
    <Content>
      { content && content() }
    </Content>
  </Wrapper>
)

export default Card
