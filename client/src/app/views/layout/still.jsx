import React, { Component } from 'react'
import styled from 'styled-components'

const StyledStill = styled.div`
  padding: 20px;
`

export default class Still extends Component {
  componentDidMount() {
    const { onComponentDidMount } = this.props

    onComponentDidMount(this._element)
  }

  render() {
    const { children } = this.props

    return (
      <StyledStill
        innerRef={ e => this._element = e }>
        { children }
      </StyledStill>
    )
  }
}
