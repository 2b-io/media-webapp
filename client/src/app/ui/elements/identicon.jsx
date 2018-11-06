import md5 from 'md5'
import React from 'react'
import styled, { css } from 'styled-components'

const easingFunc = 'cubic-bezier(.4, 0, .2, 1)'

const StyledIdenticon = styled.img`
  display: inline-block;
  ${
    ({ size }) => css`
      width: ${ size }px;
      height: ${ size }px;
    `
  }
  ${
    ({ circle }) => circle ? css`
      border-radius: 50%;
    ` : null
  }
  transition:
    width .3s ${ easingFunc },
    height .3s ${ easingFunc };
`

const src = (id, size) => `https://www.gravatar.com/avatar/${md5(id)}?d=identicon&f=y&s=${size}`

const Identicon = ({ id, size, ...props }) => {
  if (!id) {
    return null
  }

  return (
    <StyledIdenticon
      src={ src(id, size) }
      size={ size }
      { ...props }
    />
  )
}

export default Identicon
