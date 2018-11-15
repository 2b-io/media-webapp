import React from 'react'
import styled, { css } from 'styled-components'

import { PlainButton } from 'ui/elements'
import { MenuIcon } from 'ui/icons'

const Button = styled(PlainButton)`
  @media (min-width: 600px) {
    visibility: hidden;
  };
`

const MenuButton = ({ onClick }) => (
  <Button onClick={ onClick }>
    <MenuIcon />
  </Button>
)

export default MenuButton
