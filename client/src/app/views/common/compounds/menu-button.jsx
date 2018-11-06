import React from 'react'
import styled from 'styled-components'

import { MenuIcon } from 'ui/icons'

const Button = styled.div`
  @media (min-width: 600px) {
    visibility: hidden;
  }
`

const MenuButton = ({ onClick }) => (
  <Button onClick={ onClick }>
    <MenuIcon />
  </Button>
)

export default MenuButton
