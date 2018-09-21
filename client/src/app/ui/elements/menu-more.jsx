import React from 'react'
import styled from 'styled-components'

import { Button } from 'ui/elements'
import { MoreIcon } from 'ui/icons'

const Wrapper = styled.div`
  position: relative;
`

const DropdownMenu = styled.div`
  position: absolute;
  width: 224px;
  top: 32px;
  right: 8px;
  z-index: 1;
  background-color: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
  border: 1px solid ${ ({ theme }) => theme.secondary.base };
  display: ${
    ({ isOpen }) => isOpen ? 'block' : 'none'
  };
`

class MenuMore extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }

    this.hideDropdownMenu = this.hideDropdownMenu.bind(this)
    this.showDropdownMenu = this.showDropdownMenu.bind(this)
  }

  showDropdownMenu() {
    this.setState({ isOpen: true })
    document.addEventListener('click', this.hideDropdownMenu)
  }

  hideDropdownMenu() {
    this.setState({ isOpen: false })
    document.removeEventListener('click', this.hideDropdownMenu)
  }

  render() {
    const { content } = this.props

    return (
      <Wrapper>
        <Button plain onClick={ this.showDropdownMenu }>
          <MoreIcon />
        </Button>
        { content &&
          <DropdownMenu isOpen={ this.state.isOpen }>
            { content() }
          </DropdownMenu>
        }
      </Wrapper>
    )
  }
}

export default MenuMore
