import React, { Component } from 'react'
import styled from 'styled-components'

const StyledHeader = styled.div`
  position: fixed;
  background: #000000;
  z-index: 3;
  left: 0;
  right: 0;
  height: 50px;
  color: #ffffff;
  top: ${
    ({ shown }) => shown ? 0 : '-50px'
  };
  transition: ${
    ({ shown }) => shown ?
      'top .6s cubic-bezier(.4, 0, .2, 1) .6s' :
      'top .6s cubic-bezier(.4, 0, .2, 1)'
  };
`

export default class Header extends Component {
  componentDidMount() {
    const { onComponentDidMount } = this.props

    onComponentDidMount(this._element)
  }

  render() {
    const { children, shown } = this.props

    return (
      <StyledHeader
        shown={ shown }
        innerRef={ e => this._element = e }>
        { children }
      </StyledHeader>
    )
  }
}
