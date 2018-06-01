import React from 'react'
import styled from 'styled-components'

import preventDefault from 'services/prevent-default'

const StyledLink = styled.a`
  text-decoration: none;
`

const Link = ({ onClick, ...props }) => (
  <StyledLink onClick={ preventDefault(onClick) } { ...props } />
)

export default Link
