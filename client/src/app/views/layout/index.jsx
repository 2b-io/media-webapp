import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { selectors } from 'state/interface'

import Content from './content'
// import Header from './header'
import Overlay from './overlay'
import Still from './still'
import Wrapper from './wrapper'

export { default as LeftMenu } from './left-menu'
export { default as TopMenu } from './top-menu'

@connect(
  state => ({
    isLayoutClosed: selectors.isLayoutClosed(state)
  })
)
export default class Layout extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      headerHeight: 0,
      stillHeight: 0
    }
  }

  render() {
    const { isLayoutClosed, render } = this.props
    const { menuWidth, headerHeight } = this.props

    return (
      <Fragment>
        {/*
        <Header
          shown={ !isLayoutClosed }
          height={ headerHeight }
          >
          { render.header(this.props) }
        </Header>
        */}
        <Overlay
          shown={ isLayoutClosed }
          headerHeight={ headerHeight }
          width={ menuWidth }>
          { render.overlay(this.props) }
        </Overlay>
        <Wrapper
          shown={ !isLayoutClosed }
          headerHeight={ headerHeight }
          menuWidth={ menuWidth }>
          <Still
            shown={ !isLayoutClosed }
            onComponentDidMount={ this.updateStillHeight() }>
            { render.still(this.props) }
          </Still>
          <Content
            shown={ !isLayoutClosed }
            stillHeight={ this.state.stillHeight }>
            { render.content(this.props) }
          </Content>
        </Wrapper>
      </Fragment>
    )
  }

  updateStillHeight() {
    return element => {
      if (this.state.stillHeight === element.clientHeight) {
        return
      }

      this.setState({
        stillHeight: element.clientHeight
      })
    }
  }
}
