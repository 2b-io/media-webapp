import React from 'react'
import styled, { css } from 'styled-components'

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
  direction: ${ ({ direction }) => direction }

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
const Item = styled.div``

const ResponsiveGrid = ({ items, breakpoints, direction }) => {
  if (!items.length) {
    return null
  }

  return (
    <Container breakpoints={ breakpoints } direction={ direction }>
      {
         items.map(
          (item, index) => {
            const { key, content } = item

            if (!content) {
              return null
            }

            return (
              <Item
                key={ key || index }
              >
                { content() }
              </Item>
            )
          }
        )
      }
    </Container>
  )
}

export default ResponsiveGrid
