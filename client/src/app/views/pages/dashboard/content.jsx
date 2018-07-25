import React, { Component } from 'react'
import styled from 'styled-components'

import { Container } from 'ui/elements'
import Project from './project'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Box = styled.div`
  max-width: 600px;
  width: 600px;
  padding-bottom: ${ ({ theme }) => theme.spacing.medium };
  padding-right: ${ ({ theme }) => theme.spacing.medium };

  @media (max-width: 768px) {
    width: 100%;
    padding-right: 0;
  }
`

const Widget = styled.div`
  outline: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`

const breakpoints = {
  lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0
}

const cols = {
  lg: 8, md: 6, sm: 4, xs: 2, xxs: 1
}

const layout = {
}

const widgets = [{
  component: Project,
  grid: {
    w: 2,
    h: 2
  }
}, {
  component: Project,
  grid: {
    w: 2,
    h: 2
  },
}, {
  component: Project,
  grid: {
    w: 1,
    h: 2
  },
}, {
  component: Project,
  grid: {
    w: 1,
    h: 1
  }
}]

class Dashboard extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      currentCols: 0
    }

    this.onBreakpointChange = this.onBreakpointChange.bind(this)
  }

  onBreakpointChange(breakpoint, cols) {
    console.log('onBreakpointChange', breakpoint, cols)

    this.setState({
      currentCols: cols
    })

    // generate layout
  }

  // onLayoutChange(...args) {
  //   console.log('onLayoutChange', args)
  // }

  renderItems() {
    console.log('renderItems')

    if (!this.state.currentCols) {
      return null
    }

    console.log('xxx')

    return [
      <Widget key="1" data-grid={ { x: 0, y: 0, w: 1, h: 1 } }>
        <div>#1</div>
      </Widget>,
      <Widget key="2" data-grid={ { x: 0, y: 0, w: 2, h: 2 } }>
        <div>#2</div>
      </Widget>
    ]
  }

  render() {
    console.log('render')

    return (
      <Container>
        <ResponsiveReactGridLayout
          className="layout"
          onBreakpointChange={ this.onBreakpointChange }
          compactType={ 'vertical' }
          verticalCompact={ true }
          isDraggable={ false }
          isResizable={ false }
          breakpoints={ breakpoints }
          cols={ cols }
          rowHeight={ 100 }
          margin={ [ 20, 20 ] }
          containerPadding={ [ 0, 0 ] }
          measureBeforeMount={ false }
        >
          { this.renderItems() }
        </ResponsiveReactGridLayout>
      </Container>
    )
  }
}

export default Dashboard
