import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
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

const MenuMore = ({
  isOpen,
  hideMenuMore,
  showMenuMore,
  ...props
}) => {


  // showDropdownMenu() {
  //   this.setState({ isOpen: true })
  //   document.addEventListener('click', this.hideDropdownMenu)
  // }

  // hideDropdownMenu() {
  //   this.setState({ isOpen: false })
  //   document.removeEventListener('click', this.hideDropdownMenu)
  // }


  const { content } = props

  return (
    <Wrapper>
      <Button plain onClick={ () => showMenuMore() }>
        <MoreIcon />
      </Button>
      { content &&
        <DropdownMenu isOpen={ isOpen }>
          { content() }
        </DropdownMenu>
      }
    </Wrapper>
  )
}

export default connect(
  // mapState({
  //   isOpen: selectors.isOpen
  // })
  null
  ,
  mapDispatch({
    hideMenuMore: actions.hideMenuMore,
    showMenuMore: actions.showMenuMore
  })
)(MenuMore)
