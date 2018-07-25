import React, { Component } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import treeify from 'treeify'

const ResponsiveReactGridLayout = WidthProvider(Responsive)
const breakpoints = {
  lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0
}
const cols = {
  lg: 8, md: 6, sm: 4, xs: 2, xxs: 1
}

class Matrix {
  constructor(
    maxWidth = Number.MAX_SAFE_INTEGER,
    maxHeight = Number.MAX_SAFE_INTEGER
  ) {
    this.maxWidth = maxWidth
    this.maxHeight = maxHeight
  }

  place(index, w, h) {
    const { x, y, ...size } = this.find(w, h)

    console.log(`find ${ index }_${ w }x${ h } at ${ x }:${ y }`)

    for (let col = x; col < x + size.w; col++) {
      for (let row = y; row < y + size.h; row++) {
        this.set(col, row, index)
      }
    }

    // console.table(this._matrix)

    return { x, y, ...size }
  }

  enoughSpace(x, y, w, h) {
    for (let row = y; row < y + h; row++) {
      for (let col = x; col < x + w; col++) {
        if (col >= this.maxWidth) {
          return false
        }

        if (this.get(col, row)) {
          return false
        }
      }
    }

    return true
  }

  find(w, h) {
    const fitWidth = w > this.maxWidth ? this.maxWidth : w

    let col
    let row

    for (row = 0; row < this.maxHeight; row++) {
      for (col = 0; col < this.maxWidth; col++) {
        if (this.enoughSpace(col, row, fitWidth, h)) {
          return {
            x: col,
            y: row,
            w: fitWidth,
            h
          }
        }
      }
    }

    return {}
  }

  get(x, y) {
    if (x >= this.maxWidth) {
      return true
    }

    return this._matrix && this._matrix[ y ] && this._matrix[ y ][ x ]
  }

  set(x, y, value) {
    if (!this._matrix) {
      this._matrix = {}
    }

    if (!this._matrix[ y ]) {
      this._matrix[ y ] = {}
    }

    this._matrix[ y ][ x ] = value
  }
}

class MasonryLayout extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      cols: 8,
      items: []
    }

    this.onBreakpointChange = this.onBreakpointChange.bind(this)
  }

  componentDidMount() {
    this.onBreakpointChange('lg', 8)
  }

  onBreakpointChange(breakpoint, cols) {
    console.log('onBreakpointChange', breakpoint, cols)

    // generate layout
    const matrix = new Matrix(cols)

    const placedItems = this.props.items.map(
      (item, index) => ({
        ...item,
        grid: {
          key: index + 1,
          ...item.grid,
          ...matrix.place(index + 1, item.grid.w, item.grid.h)
        }
      })
    )

    this.setState({
      cols: cols,
      items: placedItems
    })

    console.table(matrix._matrix)
    // console.log(treeify.asTree(placedItems, true, true))
  }

  renderItems() {
    if (!this.state.items) {
      return null
    }

    return this.state.items.map(
      ({ component: Component, grid: { key, ...data } }) => (
        <div key={ key } data-grid={ data }>
          <Component />
        </div>
      )
    )
  }

  render() {
    return (
      <ResponsiveReactGridLayout
        className="layout"
        isDraggable={ false }
        isResizable={ false }
        verticalCompact={ true }
        breakpoints={ breakpoints }
        cols={ cols }
        rowHeight={ 100 }
        margin={ [ 20, 20 ] }
        containerPadding={ [ 0, 0 ] }
        measureBeforeMount={ false }
        onBreakpointChange={ this.onBreakpointChange }
      >
        { this.renderItems() }
      </ResponsiveReactGridLayout>
    )
  }
}

export default MasonryLayout
