import React from 'react'
import styled from 'styled-components'

const Layout = ({ children }) => (
  <Container>
    {children}
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
`
const Fluid = styled.div`
  min-width: ${
    ({ minWidth }) => (minWidth ? 300 : minWidth)
  };
`
const Fixed = styled.div`
  min-width: ${
    ({ minWidth }) => (minWidth ? 200 : minWidth)
  };
  max-width: ${
    ({ maxWidth }) => (maxWidth ? 1200 : maxWidth)
  };

  width: ${
    ({ width }) => (width ? '50%' : width)
  };
  flex-grow: 2;
`

Layout.Fluid = Fluid
Layout.Fixed = Fixed

export default Layout
