import React from 'react'
import Icon from 'react-icons-kit'
import styled, { css } from 'styled-components'

const toPixel = size => (
  size === 'extra-large' ?
    48 : (
      size === 'large' ? 32 : (
        size=== 'medium' ? 24 : 16
      )
    )
)

const Surface = styled.div`
  display: inline-block;
  margin: 0 auto;
  ${
    ({ size }) => css`
      width: ${ size }px;
      height: ${ size }px;
    `
  }
`

export default type => {
  const IconWrapper = ({ size, ...props }) => (
    <Surface size={ toPixel(size) }>
      <Icon
        icon={ type }
        size={ toPixel(size) }
        { ...props }
      />
    </Surface>
  )

  IconWrapper.propTypes = {

  }

  return IconWrapper
}
