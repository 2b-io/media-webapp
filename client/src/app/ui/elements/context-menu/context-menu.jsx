import React, { Component } from 'react'
import styled from 'styled-components'

import { MoreIcon } from 'ui/icons'
import { Button } from 'ui/elements'

const Menu = styled.div`
  position: relative;
  display: flex;
`

const MenuContent = styled.div`
  position: absolute;
  top: 32px;
  right: 8px;
  width: 240px;
  z-index: 2;
  background: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
  box-shadow: 4px 4px ${ ({ theme }) => theme.black.opaque.base };
`

const Border = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid ${ ({ theme }) => theme.secondary.base };
  z-index: 0;
`

const Content = styled.div`
  position: relative;
  z-index: 1;
`

const MenuDisable = styled.div`
  background-color: ${ ({ disabled }) => disabled && '#e6e6e6' };;
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

    document.addEventListener('click', this.deactivate)
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

    document.removeEventListener('click', this.deactivate)
  }

  componentWillUnmount() {
    this.deactivate()
  }

  render() {
    const { disabled, icon, content, stateless } = this.props
    const isActive = stateless ?
      this.props.isActive :
      this.state.isActive

    return (
      <Menu>
        <Button disabled={ disabled } plain onClick={ this.activate }>
          <MenuDisable disabled={ disabled }>
            { icon && icon({ isActive }) || <MoreIcon /> }
          </MenuDisable>
        </Button>
        { isActive && (
          <MenuContent>
            <Border />
            <Content>{ content() }</Content>
          </MenuContent>
        ) }
      </Menu>
    )
  }
}

export default ContextMenu
