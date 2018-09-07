import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { selectors } from 'state/interface'

import Header from './header'
import Body from './body'

const Surface = styled.main`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: min-content 1fr;
  height: 100%;
`

const Overlay = styled.section`

`

const Layout = ({ isLayoutClosed, render, ...props }) => {
  console.log(isLayoutClosed)

  return (
    <Fragment>
      <Surface>
        { !isLayoutClosed && (
          <Header className="header">
            { render.still(props) }
          </Header>
          ) }
        <Body className="body">
          { isLayoutClosed ? render.overlay(props) : render.content(props) }
        </Body>
      </Surface>
      <Overlay>
        {  }
      </Overlay>
    </Fragment>
  )
}


export default connect(
  state => ({
    isLayoutClosed: selectors.isLayoutClosed(state)
  })
)(Layout)
