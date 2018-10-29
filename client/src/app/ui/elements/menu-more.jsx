import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { mapDispatch } from 'services/redux-helpers'
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
  z-index: 2;
  background-color: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
  border: 1px solid ${ ({ theme }) => theme.secondary.base };
  display: ${
    ({ isOpen }) => isOpen ? 'block' : 'none'
  };
  box-shadow: 4px 4px ${ ({ theme }) => theme.black.opaque.base };
`

class MenuMore extends React.Component {
  constructor(props) {
    super(props)

    this.hideDropdownMenu = this.hideDropdownMenu.bind(this)
    this.showDropdownMenu = this.showDropdownMenu.bind(this)
  }

  showDropdownMenu() {
    this.props.showMenuMore(this.props.name)
    document.addEventListener('click', this.hideDropdownMenu)
  }

  hideDropdownMenu() {
    this.props.hideMenuMore(this.props.name)
    document.removeEventListener('click', this.hideDropdownMenu)
  }

  render() {
    const { content, isOpen } = this.props

    return (
      <Wrapper>
        <Button plain onClick={ this.showDropdownMenu }>
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
}

MenuMore.propTypes = {
  name: PropTypes.string.isRequired
}

export default connect(
  (state, { name }) => ({
    isOpen: selectors.isOpenState(state, name)
  }),
  mapDispatch({
    hideMenuMore: actions.hideMenuMore,
    showMenuMore: actions.showMenuMore
  })
)(MenuMore)

