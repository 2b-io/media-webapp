import React, { Component } from 'react'
import { Portal } from 'react-portal'
import styled from 'styled-components'

import { BreakPoint, Button } from 'ui/elements'
import { MoreIcon } from 'ui/icons'

const Wrapper = styled.nav`
  position: relative;
  white-space: nowrap;

  & > * {
    margin-left: 10px;
  }
`

const DropDownMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${ ({ dock }) => `${ dock }px` };
  right: 0;
  padding: ${ ({ theme: { spacing: { medium } } }) => `0 ${ medium } ${ medium }}` };
  z-index: 9;
  background: ${ ({ theme }) => theme.primary.limpid.base };
  color: ${ ({ theme }) => theme.primary.limpid.on.base };

  & > * {
    margin-top: ${ ({ theme }) => theme.spacing.medium };
  }
`
// TODO fix stateful
class CollapsibleMenu extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      showDropDownMenu: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    this.setState({
      showDropDownMenu: !this.state.showDropDownMenu
    })
  }

  render() {
    const { children, dock } = this.props
    const { showDropDownMenu } = this.state

    return (
      <Wrapper>
        <BreakPoint name="medium">
          { children }
        </BreakPoint>
        <BreakPoint name="small">
          <Button plain onClick={ this.toggleMenu }>
            <MoreIcon size="medium" />
          </Button>
          {
            showDropDownMenu && (
              <Portal node={ document && document.getElementById('wrapper') }>
                <DropDownMenu dock={ dock }>
                  { children }
                </DropDownMenu>
              </Portal>
            )
          }
        </BreakPoint>
      </Wrapper>
    )
  }
}

export default CollapsibleMenu
