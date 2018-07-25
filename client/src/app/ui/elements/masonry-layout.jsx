import React, { Component, Fragment } from 'react'
import Dimension from 'react-container-dimensions'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-gap: ${
    ({ theme }) => theme.spacing.medium
  };
  grid-auto-rows: 100px;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
`

const Item = styled.div.attrs({
  style: ({ width, height }) => ({
    gridColumnEnd: `span ${ width }`,
    gridRowEnd: `span ${ height }`
  })
})``

class MasonryLayout extends Component {
  constructor(...args) {
    super(...args)
    this.renderItems = this.renderItems.bind(this)
  }

  renderItems() {
    if (!this._wrapper) {
      return null
    }

    const { gridTemplateColumns } = window.getComputedStyle(this._wrapper)

    const cols = gridTemplateColumns
      .split(' ')
      .map(value => parseInt(value, 10))
      .filter(Boolean)
      .length

    return (
      <Fragment>
        {
          this.props.items.map(
            ({ component: Component, grid: { w, h } }, index) => (
              <Item
                key={ `item-${ index }` }
                width={ w > cols ? cols : w }
                height={ h }
              >
                <Component />
              </Item>
            )
          )
        }
      </Fragment>
    )
  }

  render() {
    return (
      <Wrapper innerRef={ e => this._wrapper = e }>
        <Dimension>
          { this.renderItems }
        </Dimension>
      </Wrapper>
    )
  }
}

export default MasonryLayout
