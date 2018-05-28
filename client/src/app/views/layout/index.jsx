import React, { Component, Fragment } from 'react'

import Router from 'views/router'

import Content from './content'
import Header from './header'
import Overlay from './overlay'
import Still from './still'
import Wrapper from './wrapper'

export default class Layout extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      headerHeight: 0,
      stillHeight: 0
    }
  }

  render() {
    const { isSignedIn, history, render } = this.props

    return (
      <Fragment>
        <Header
          shown={ isSignedIn }
          onComponentDidMount={ this.updateHeaderHeight() }>
          { render.header(this.props) }
        </Header>
        <Overlay
          shown={ !isSignedIn }
          headerHeight={ this.state.headerHeight }>
          { render.overlay(this.props) }
        </Overlay>
        <Wrapper
          shown={ isSignedIn }
          headerHeight={ this.state.headerHeight }>
          <Still
            shown={ isSignedIn }
            onComponentDidMount={ this.updateStillHeight() }>
            { render.still(this.props) }
          </Still>
          <Content
            shown={ isSignedIn }
            stillHeight={ this.state.stillHeight }>
            { render.content(this.props) }
          </Content>
        </Wrapper>
      </Fragment>
    )
  }

  updateHeaderHeight() {
    return element => this.setState({
      headerHeight: element.clientHeight
    })
  }

  updateStillHeight() {
    return element => this.setState({
      stillHeight: element.clientHeight
    })
  }
}
