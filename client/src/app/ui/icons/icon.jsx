import React from 'react'
import Icon from 'react-icons-kit'
import styled from 'styled-components'

import { LIGHT0, LIGHT4 } from 'ui/color-palettes'

const StyledIcon = styled(Icon)`
  color: ${
    ({ inverted = false }) => inverted ? LIGHT0 : LIGHT4
  }
`

const toPixel = size => (
  size === 'extra-large' ?
    48 : (
      size === 'large' ? 32 : (
        size=== 'medium' ? 24 : 16
      )
    )
)

export default type => {
  const Icon = ({ inverted = 0, size, ...props }) => (
    <StyledIcon
      inverted={ Number(inverted) }
      icon={ type }
      size={ toPixel(size) }
      { ...props }
    />
  )

  Icon.propTypes = {

  }

  return Icon
}
