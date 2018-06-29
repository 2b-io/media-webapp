import React from 'react'
import Icon from 'react-icons-kit'
import styled from 'styled-components'

const StyledIcon = styled(Icon)`
  color: ${
    ({ inverted = false }) => inverted ? '#fff' : '#000'
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
