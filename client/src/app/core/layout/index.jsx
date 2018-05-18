import React, { Component, Fragment } from 'react'
import styled, { css } from 'styled-components'

export class Layout extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      shown: true
    }
  }

  render() {
    const { shown } = this.state

    return (
      <Fragment>
        <Header shown={!shown} />
        <Overlay
          onClick={() => this.setState({ shown: !shown })}
          shown={shown}
        />
        <Wrapper shown={!shown} />
      </Fragment>
    )
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
  render() {
    const { shown } = this.props

    return <StyledHeader shown={shown}>Header</StyledHeader>
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
  constructor(...args) {
    super(...args)

    this.state = { shown: false }
  }

  render() {
    const { shown, onClick } = this.props

    return (
      <StyledOverlay shown={shown}>
        <div>
          <div>Overlay</div>
          <button onClick={onClick}>Login</button>
        </div>
      </StyledOverlay>
    )
  }
}

const StyledWrapper = styled.div`
  position: absolute;
  top: 50px;
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

    this.state = { height: 0 }
  }

  render() {
    const { shown } = this.props
    const { height } = this.state

    return (
      <StyledWrapper shown={shown}>
        <Still
          shown={shown}
          onHeightCalculated={height => this.setState({ height })}
        />
        <Content
          shown={shown}
          height={height}
        />
      </StyledWrapper>
    )
  }
}

const StyledStill = styled.div`
  padding: 20px;
`

class Still extends Component {
  componentDidMount() {
    console.log('componentDidMount')

    const { onHeightCalculated } = this.props

    console.log(this._element.clientHeight)

    onHeightCalculated(this._element.clientHeight)
  }

  render() {
    console.log('render')

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
    (props) => props.shown ? `${props.height}px` : '100%'
  };
  ${
    (props) => props.shadow ? css`
      bottom: 0;
    ` : null
  }
`

class Content extends Component {
  render() {
    const { height, shown } = this.props

    return (
      <Fragment>
        <StyledContent shadow shown={shown} height={height}></StyledContent>
        <StyledContent shown={shown} height={height}>Content</StyledContent>
      </Fragment>
    )
  }
}
