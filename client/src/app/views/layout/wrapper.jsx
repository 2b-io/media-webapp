import React, { Component } from 'react'
import styled from 'styled-components'

import Content from './content'
import Still from './still'

const StyledWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: ${
    ({ headerHeight }) => `${headerHeight}px`
  };
  left: 100px;
  right: 0;
  bottom: 0;
  -webkit-overflow-scrolling: touch;
  overflow: ${
    ({ shown }) => shown ? 'auto' : 'hidden'
  };
`

export default class Wrapper extends Component {
  constructor(...args) {
    super(...args)

    this.state = { stillHeight: 0 }
  }

  render() {
    const { shown, headerHeight } = this.props
    const { stillHeight } = this.state

    return (
      <StyledWrapper
        shown={ shown }
        headerHeight= { headerHeight }>
        <Still
          shown={ shown }
          onComponentDidMount={ this.updateStillHeight() }
        />
        <Content
          shown={ shown }
          stillHeight={ this.state.stillHeight }
        />
      </StyledWrapper>
    )
  }

  updateStillHeight() {
    return element => this.setState({
      stillHeight: element.clientHeight
    })
  }
}
