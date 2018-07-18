import React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Link } from 'ui/elements'

import {
  BillingIcon,
  DashboardIcon,
  PaymentIcon,
  ProjectListIcon,
  SignOutIcon,
  UiIcon
} from 'ui/icons'

const MenuWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: ${ ({ width }) => `${width}px` };
  margin-left: auto;
  margin-right: auto;
  padding: ${ ({ theme: { spacing } }) => `${ spacing.small } ${ spacing.tiny }`  };
  padding: 0;
  font-size: 12px;
`

const Menu = styled.ul`
`

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${
    ({ separator, theme }) => separator &&
      css`
        border-top: 1px dashed ${ theme.secondary.on.base };
      `
  }
`

const LinkButton = styled(Link).attrs({
  href: '#'
})`
  width: 100%;
  padding: ${ ({ theme }) => `${ theme.spacing.tiny } 0` };
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: inherit;

  &:hover {
    background: ${ ({ theme }) => theme.secondary.light.base };
    color: ${ ({ theme }) => theme.secondary.light.on.base };
  }

  &:active {
    background: ${ ({ theme }) => theme.secondary.dark.base };
    color: ${ ({ theme }) => theme.secondary.dark.on.base };
  }
`

const MenuIcon = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 44px;
  text-align: center;
`

const MenuTitle = styled.div`
  flex-grow: 1;
  font-size: 1.15em;
  padding-left: ${ ({ theme }) => theme.spacing.small };
`

const LeftMenu = ({
  signOut,
  toDashboard,
  toProjectList,
  toUI,
  width
}) => (
  <MenuWrapper width={ width }>
    <Menu>
      <MenuItem>
        <LinkButton href="/" onClick={ toDashboard }>
          <MenuIcon>
            <DashboardIcon size="medium" />
          </MenuIcon>
          <MenuTitle>Dashboard</MenuTitle>
        </LinkButton>
      </MenuItem>
      <MenuItem>
        <LinkButton href="/projects"  onClick={ toProjectList }>
          <MenuIcon>
            <ProjectListIcon size="medium" />
          </MenuIcon>
          <MenuTitle>Projects</MenuTitle>
        </LinkButton>
      </MenuItem>
      <MenuItem>
        <LinkButton onClick={ () => {} }>
          <MenuIcon>
            <BillingIcon size="medium" />
          </MenuIcon>
          <MenuTitle>Billing</MenuTitle>
        </LinkButton>
      </MenuItem>
      <MenuItem>
        <LinkButton onClick={ () => {} }>
          <MenuIcon>
            <PaymentIcon size="medium" />
          </MenuIcon>
          <MenuTitle>Payment</MenuTitle>
        </LinkButton>
      </MenuItem>
      <MenuItem>
        <LinkButton onClick={ signOut }>
          <MenuIcon>
            <SignOutIcon size="medium" />
          </MenuIcon>
          <MenuTitle>Sign Out</MenuTitle>
        </LinkButton>
      </MenuItem>
      <MenuItem separator={ true }>
        <LinkButton onClick={ toUI }>
          <MenuIcon>
            <UiIcon size="medium" />
          </MenuIcon>
          <MenuTitle>Elements</MenuTitle>
        </LinkButton>
      </MenuItem>
    </Menu>
  </MenuWrapper>
)

export default connect(
  null,
  mapDispatch({
    toDashboard: () => actions.requestLocation('/'),
    toProjectList: () => actions.requestLocation('/projects'),
    toUI: () => actions.requestLocation('/ui'),
    signOut: () => actions.closeLayout()
  })
)(LeftMenu)
