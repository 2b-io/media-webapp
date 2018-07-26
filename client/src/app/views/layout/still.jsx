import React, { Component } from 'react'
import styled from 'styled-components'

const StyledStill = styled.div`
  background: ${ ({ theme }) => theme.background.base };
  color: ${ ({ theme }) => theme.background.on.base };
`

export default class Still extends Component {
  componentDidMount() {
    const { onComponentDidMount } = this.props

    onComponentDidMount(this._element)
  }

  componentDidUpdate() {
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
