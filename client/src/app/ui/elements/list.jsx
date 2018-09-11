import React from 'react'
import styled, { css } from 'styled-components'

const grid = () => css`
  display: grid;

  & > * {
    min-width: 0;
    min-height: 0;
  }
`

const Wrapper = styled.ul`
  ${ grid }
  grid-template-columns: 100%
  grid-auto-rows: 40px;
`

const Item = styled.li`
  ${ grid }

  grid-template-columns:
    ${ ({ hasLeading }) => hasLeading ? 'min-content' : '' }
    1fr
    ${ ({ hasTrailing }) => hasTrailing ? 'min-content' : '' };
`

const List = ({ items }) => (
  <Wrapper>
    {
      items.map(
        ({ key, leading, trailing, content, ...props }, index) => {
          const hasLeading = !!leading
          const hasTrailing = !!trailing

          return (
            <Item { ...props }
              key={ key || index }
              hasLeading={ hasLeading }
              hasTrailing={ hasTrailing }
            >
              { leading && leading() }
              { content && content({ hasLeading, hasTrailing }) }
              { trailing && trailing() }
            </Item>
          )
        }
      )
    }
  </Wrapper>
)

export default List
