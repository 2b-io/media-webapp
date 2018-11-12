import PropTypes from 'prop-types'
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
  // grid-auto-rows: 40px;
`

const Item = styled.li`
  ${ grid }

  grid-template-columns:
    ${ ({ hasLeading }) => hasLeading ? 'min-content' : '' }
    1fr
    ${ ({ hasTrailing }) => hasTrailing ? 'min-content' : '' };
  ${
    ({
      interactable,
      theme
    }) => interactable &&
      css`
        ${
          theme.mouseDetected && `
            cursor: pointer;
          `
        };
        ${
          theme.mouseDetected && !theme.touchDetected && `
            &:hover {
              background: ${ theme.hoverColor };
              opacity: 0.7;
            }
          `
        }
      `
  }
`

const List = ({ interactable, items }) => (
  <Wrapper>
    {
      items.map(
        (item, index) => {
          if (!item) {
            return null
          }

          const { key, leading, trailing, content, ...props } = item

          const hasLeading = !!leading
          const hasTrailing = !!trailing

          return (
            <Item { ...props }
              interactable={ interactable }
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

List.propTypes = {
  interactable: PropTypes.bool
}

export default List
