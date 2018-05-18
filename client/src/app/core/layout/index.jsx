import React, { Component, Fragment } from 'react'
import styled, { css } from 'styled-components'

export class Layout extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      shown: true,
      headerHeight: 0
    }
  }

  render() {
    const { shown, headerHeight } = this.state

    return (
      <Fragment>
        <Header
          shown={!shown}
          onComponentDidMount={this.updateHeaderHeight()}
        />
        <Overlay
          onClick={() => this.setState({ shown: !shown })}
          shown={shown}
        />
        <Wrapper
          shown={!shown}
          headerHeight={headerHeight}
        />
      </Fragment>
    )
  }

  updateHeaderHeight() {
    return (element) => this.setState({
      headerHeight: element.clientHeight
    })
  }
}

const StyledHeader = styled.div`
  position: fixed;
  background: #000000;
  z-index: 3;
  left: 0;
  right: 0;
  height: 50px;
  color: #FFFFFF;
  top: ${
    (props) => props.shown ? 0 : '-50px'
  };
  transition: ${
    (props) => props.shown ?
      'top 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) 0.6s' :
      'top 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)'
  };
`

class Header extends Component {
  componentDidMount() {
    const { onComponentDidMount } = this.props

    onComponentDidMount(this._element)
  }

  render() {
    const { shown } = this.props

    return (
      <StyledHeader
        shown={shown}
        innerRef={element => this._element = element}>
        Header
      </StyledHeader>
    )
  }
}

const StyledOverlay = styled.div`
  position: fixed;
  background-color: gray;
  z-index: 2;
  top: 0;
  left: 0;
  bottom: 0;
  transition: width 1.2s cubic-bezier(0.4, 0.0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${
    (props) => props.shown ? '100%' : '100px'
  };
`

class Overlay extends Component {
  render() {
    const { shown, onClick } = this.props

    return (
      <StyledOverlay shown={shown}>
        <div>
          <div>Overlay</div>
          <button onClick={onClick}>{shown ? 'Sign In' : 'Sign Out'}</button>
        </div>
      </StyledOverlay>
    )
  }
}

const StyledWrapper = styled.div`
  position: absolute;
  top: ${
    (props) => `${props.headerHeight}px`
  };
  z-index: 1;
  left: 100px;
  right: 0;
  bottom: 0;
  -webkit-overflow-scrolling: touch;
  overflow: ${
    (props) => props.shown ? 'auto' : 'hidden'
  };
`

class Wrapper extends Component {
  constructor(...args) {
    super(...args)

    this.state = { stillHeight: 0 }
  }

  render() {
    const { shown, headerHeight } = this.props
    const { stillHeight } = this.state

    return (
      <StyledWrapper
        shown={shown}
        headerHeight={headerHeight}>
        <Still
          shown={shown}
          onComponentDidMount={this.updateStillHeight()}
        />
        <Content
          shown={shown}
          stillHeight={stillHeight}
        />
      </StyledWrapper>
    )
  }

  updateStillHeight() {
    return (element) => this.setState({
      stillHeight: element.clientHeight
    })
  }
}

const StyledStill = styled.div`
  padding: 20px;
`

class Still extends Component {
  componentDidMount() {
    const { onComponentDidMount } = this.props

    onComponentDidMount(this._element)
  }

  render() {
    const { shown } = this.props

    return (
      <StyledStill shown={shown}
        innerRef={element => this._element = element}>
        <div>Still</div>
      </StyledStill>
    )
  }
}

const StyledContent = styled.div`
  padding: 20px;
  background-color: whitesmoke;
  position: absolute;
  left: 0;
  right: 0;
  transition: top 1.2s cubic-bezier(0.4, 0.0, 0.2, 1);
  top: ${
    (props) => props.shown ? `${props.stillHeight}px` : '100%'
  };
  ${
    (props) => props.shadow ? css`
      bottom: 0;
    ` : null
  }
`

class Content extends Component {
  render() {
    const { stillHeight, shown } = this.props

    return (
      <Fragment>
        <StyledContent shadow
          shown={shown}
          stillHeight={stillHeight}
        />
        <StyledContent
          shown={shown}
          stillHeight={stillHeight}>
          Content
        </StyledContent>
      </Fragment>
    )
  }
}
