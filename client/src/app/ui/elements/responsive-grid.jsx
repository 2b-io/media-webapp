import React, { Component } from 'react'
import ContainerDimensions from 'react-container-dimensions'
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

  ${
    ({ height = 'fixed' }) => height === 'auto' && css`
      grid-auto-rows: 16px;
    `
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

const Item = styled.div`
  background: ${ ({ theme }) => theme.white.base };
`

class ResponsiveGrid extends Component {
  constructor(...args) {
    super(...args)

    this._items = {}
  }

  renderContent(key, content) {
    return ({ width, height }) => {
      const item = this._items[ key ]

      if (!item) {
        return
      }

      const rowSpan = Math.ceil((height + 16) / (16 + 16))

      item.style.gridRowEnd = `span ${ rowSpan }`

      return content()
    }
  }

  renderAutoItem(index, { key, content }) {
    return (
      <Item key={ key || index } innerRef={ e => this._items[ key || index ] = e }>
        <div>
          <ContainerDimensions key={ key || index }>
            { this.renderContent(key || index, content) }
          </ContainerDimensions>
        </div>
      </Item>
    )
  }

  renderFixedItem(index, { key, content }) {
    return (
      <Item key={ key || index }>
        { content() }
      </Item>
    )
  }

  renderContainer({ items, breakpoints, direction, height = 'fixed' }) {
    return () => {
      return (
        <Container breakpoints={ breakpoints } direction={ direction }>
          {
            items.map(
              (item, index) => {
                const { key, content } = item

                if (!content) {
                  return null
                }

                if (height === 'auto') {
                  return this.renderAutoItem(index, item)
                }

                return this.renderFixedItem(index, item)
              }
            )
          }
        </Container>
      )
    }
  }

  render() {
    const { items } = this.props

    if (!items.length) {
      return null
    }

    return this.renderContainer(this.props)()
  }
}

export default ResponsiveGrid
