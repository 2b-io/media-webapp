import React from 'react'
import styled, { css } from 'styled-components'

const BREAK_POINT_DEFAULT = {
  phone: 1,
  tablet: 2,
  laptop: 3,
  desktop: 4,
  otherwise: 5,
}
const generateTemplateColumns = (name) => css`
  grid-template-columns: ${
    ({ breakpoints }) => {
      const breakpoint = breakpoints[name] || breakpoints.otherwise

      return (typeof breakpoint === 'string') ?
        breakpoint :
        `repeat(${ breakpoint }, 1fr)`
    }
  }
`

const Container = styled.div`
  display: grid;
  grid-gap: 16px;

  & > * {
    min-width: 0;
    min-height: 0;
  }

  @media (min-width: 320px) {
    ${ generateTemplateColumns('phone') }
  }

  @media (min-width: 600px) {
    ${ generateTemplateColumns('tablet') }
  }

  @media (min-width: 1024px) {
    ${ generateTemplateColumns('laptop') }
  }

  @media (min-width: 1440px) {
    ${ generateTemplateColumns('desktop') }
  }

  @media (min-width: 1920px) {
    ${ generateTemplateColumns('2k') }
  }
`

const ResponsiveGrid = ({ items, breakpoints }) => (
  <Container breakpoints={ breakpoints } >
    {
      items.map(
        (item, index) => {
          if (!item) {
            return null
          }

          const { key, content, ...props } = item

          return (
            <div { ...props }
              key={ key || index }
            >
              { content() }
            </div>
          )
        }
      )
    }
  </Container>
)


export default ResponsiveGrid
