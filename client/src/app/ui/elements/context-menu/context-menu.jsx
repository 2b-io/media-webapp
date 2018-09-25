import React, { Component, Fragment } from 'react'
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
  width: 224px;
  z-index: 2;
  background: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
  box-shadow: 4px 4px ${ ({ theme }) => theme.black.opaque.base };
  border: 1px solid ${ ({ theme }) => theme.secondary.base };
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
      this.props.activate(name)
    } else {
      this.setState({
        isActive: true
      })
    }

    document.addEventListener('click', this.deactivate, true)
  }

  deactivate() {
    const { stateless, deactivate, name } = this.props

    if (stateless) {
      this.props.deactivate(name)
    } else {
      this.setState({
        isActive: false
      })
    }

    document.removeEventListener('click', this.deactivate, true)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.deactivate, true)
  }

  render() {
    const { icon, content, stateless } = this.props
    const isActive = stateless ?
      this.props.isActive :
      this.state.isActive

    return (
      <Menu>
        <Button plain onClick={ this.activate }>
          { icon && icon({ isActive }) || <MoreIcon /> }
        </Button>
        { isActive && (
          <MenuContent>
            { content() }
          </MenuContent>
        ) }
      </Menu>
    )
  }
}

export default ContextMenu
