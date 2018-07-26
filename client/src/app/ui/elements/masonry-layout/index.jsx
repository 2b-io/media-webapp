import React, { Component, Fragment } from 'react'
import Dimension from 'react-container-dimensions'
import styled from 'styled-components'

import Matrix from './matrix'

const Wrapper = styled.div`
  display: grid;
  grid-gap: ${
    ({ theme }) => theme.spacing.medium
  };
  grid-auto-rows: 270px;
  grid-template-columns: repeat(
    auto-fill,
    minmax(230px, 1fr)
  ); /* support iphone 5s */
`

const Item = styled.div.attrs({
  style: ({ x, y, w, h }) => ({
    gridColumnStart: x + 1,
    gridRowStart: y + 1,
    gridColumnEnd: `span ${ w }`,
    gridRowEnd: `span ${ h }`
  })
})``

class MasonryLayout extends Component {
  constructor(...args) {
    super(...args)
    this.renderItems = this.renderItems.bind(this)

    this._layoutWidth = 0
    this._items = []
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

    const diff = cols
      .filter(
        (value, index, self) => self.indexOf(value) === index
      )

    const colNo = diff.length > 1 ? 1 : cols.length

    if (this._layoutWidth !== colNo) {
      const matrix = new Matrix(colNo)

      this._layoutWidth = colNo
      this._items = this.props.items.map(
        (item, index) => ({
          ...item,
          grid: {
            ...matrix.place(index + 1, item.grid.w, item.grid.h)
          }
        })
      )
    }

    return (
      <Fragment>
        {
          this._items.map(
            ({ component: Component, grid }, index) => (
              <Item
                key={ `item-${ index }` }
                { ... grid }
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
