import React from 'react'
import styled, { css } from 'styled-components'

import { MenuIcon } from 'ui/icons'

const Button = styled.div`
  @media (min-width: 600px) {
    visibility: hidden;
  };
  cursor: ${
    ({
      disabled,
      theme: { mouseDetected }
    }) => disabled ? 'not-allowed' : (
      mouseDetected ? 'pointer' : 'unset'
    )
  };
  ${
    ({ theme }) => theme.mouseDetected && !theme.touchDetected &&
      css`
        transition: opacity .3s;
        &:hover {
          opacity: 0.7
        };
      `
  };
`

const MenuButton = ({ onClick }) => (
  <Button onClick={ onClick }>
    <MenuIcon />
  </Button>
)

export default MenuButton
