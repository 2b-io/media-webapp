import React from 'react'
import Icon from 'react-icons-kit'

const toPixel = size => (
  size === 'extra-large' ?
    48 : (
      size === 'large' ? 32 : (
        size=== 'medium' ? 24 : 16
      )
    )
)

export default type => {
  const IconWrapper = ({ size, ...props }) => (
    <Icon
      icon={ type }
      size={ toPixel(size) }
      { ...props }
    />
  )

  IconWrapper.propTypes = {

  }

  return IconWrapper
}
