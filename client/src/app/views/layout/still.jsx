import React, { Component } from 'react'
import styled from 'styled-components'

import { LIGHT0, LIGHT4 } from 'ui/color-palettes'

const StyledStill = styled.div`
  background: ${ LIGHT4 };
  color: ${ LIGHT0 };
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
