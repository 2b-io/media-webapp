import React, { Component } from 'react'
import styled, { css } from 'styled-components'

import { MoreIcon } from 'ui/icons'
import { PlainButton } from 'ui/elements'

const Menu = styled.div`
  position: relative;
  display: flex;
`

const MenuContent = styled.div`
  position: absolute;
  top: 32px;
  right: 8px;
  width: 280px;
  z-index: 2;
  background: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
  box-shadow: 4px 4px ${ ({ theme }) => theme.black.opaque.base };
`

const Border = styled.div`
  position: absolute;
  background: ${ ({ theme }) => theme.secondary.base };
  z-index: 1;

  ${
    ({ side }) => {
      switch (side) {
        case 'top':
          return css`
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
          `
        case 'bottom':
          return css`
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
          `
        case 'right':
          return css`
            top: 0;
            bottom: 0;
            right: 0;
            width: 1px;
          `
        case 'left':
          return css`
            top: 0;
            bottom: 0;
            left: 0;
            width: 1px;
          `
      }
    }
  }
`

const Content = styled.div`
  position: relative;
  z-index: 0;
`

class ContextMenu extends Component {
  constructor(...args) {
    super(...args)

    this.activate = this.activate.bind(this)
    this.deactivate = this.deactivate.bind(this)
    this.state = {
      isActive: false
    }
  }

  activate() {
    const { stateless, activate, name } = this.props

    if (stateless) {
      activate && activate(name)
    } else {
      this.setState({
        isActive: true
      })
    }
  }

  deactivate() {
    const { stateless, deactivate, name } = this.props

    if (stateless) {
      deactivate && deactivate(name)
    } else {
      this.setState({
        isActive: false
      })
    }
  }

  componentWillUnmount() {
    this.deactivate()
  }

  toggleActivation(currentState) {
    return () => {
      if (currentState) {
        this.deactivate()
      } else {
        this.activate()
      }
    }
  }

  render() {
    const { disabled, icon, content, stateless } = this.props
    const isActive = stateless ?
      this.props.isActive :
      this.state.isActive

    return (
      <Menu>
        <PlainButton
          disabled={ disabled }
          onClick={ this.toggleActivation(isActive) }
        >
          { icon && icon({ isActive }) || <MoreIcon /> }
        </PlainButton>
        { isActive && (
          <MenuContent>
            <Content>{ content() }</Content>
            <Border side="top" />
            <Border side="right" />
            <Border side="bottom" />
            <Border side="left" />
          </MenuContent>
        ) }
      </Menu>
    )
  }
}

export default ContextMenu
