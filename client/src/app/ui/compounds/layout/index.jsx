import React, { Component, Fragment } from 'react'
import Dimension from 'react-container-dimensions'
import styled from 'styled-components'

const getBreakpoint = size => size === 'small' ?
  360 : (size === 'large' ?
    1150 : (size === 'medium' ?
      800 : 0
    )
  )

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
`

const FixedItem = styled.div`
  flex-grow: 1;
  width: ${
    ({ size }) => size ? `${ getBreakpoint(size) }px` : 'auto'
  };
  max-width: ${
    ({ layout, size }) => layout !== 'vertical' && size ?
      `${ getBreakpoint(size) }px` : 'none'
  };
`

const FluidItem = styled.div`
  flex-grow: 1;
  width: ${
    ({ size }) => size ? `${ getBreakpoint(size) }px` : 'auto'
  };
`

class Layout extends Component {
  constructor(...args) {
    super(...args)

    this.renderItems = this.renderItems.bind(this)
    this.layoutItems = []
  }

  addLayoutItem(item) {
    if (!item || this.layoutItems.indexOf(item) > -1) {
      return
    }

    this.layoutItems.push(item)
  }

  calculateUniqueTops() {
    return this.layoutItems
      .map(
        item => item.getBoundingClientRect().top
      )
      .filter(
        (value, index, self) => self.indexOf(value) === index
      )
  }

  renderItems() {
    const tops = this.calculateUniqueTops()

    return (
      <Fragment>
        {
          React.Children.map(
            this.props.children,
            child => React.cloneElement(child, {
              innerRef: e => this.addLayoutItem(e),
              layout: tops.length === 1 ? 'horizontal' : 'vertical'
            })
          )
        }
      </Fragment>
    )
  }

  render() {
    const { children } = this.props

    if (!children || children.length < 2) {
      return (
        <Wrapper>{ children }</Wrapper>
      )
    }

    return (
      <Wrapper>
        <Dimension>
          { this.renderItems }
        </Dimension>
      </Wrapper>
    )
  }
}

Layout.Fixed = FixedItem
Layout.Fluid = FluidItem

export default Layout
