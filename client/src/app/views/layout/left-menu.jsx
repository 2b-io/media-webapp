import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Link } from 'ui/elements'

import {
  BillingIcon,
  DashboardIcon,
  PaymentIcon,
  ProjectListIcon,
  SignOutIcon
} from 'ui/icons'

const MenuWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: ${ ({ width }) => `${width}px` };
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  font-size: 12px;
`

const Menu = styled.ul`
`

const MenuItem = styled.li`
`

const LinkButton = styled(Link).attrs({
  href: '#'
})`
  height: 40px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`

const MenuItemLabel = styled.label`
  margin-left: 10px;
  flex-grow: 1;
`

const LeftMenu = ({ signOut, toDashboard, toProjectList, width }) => (
  <MenuWrapper width={ width }>
    <Menu>
      <MenuItem>
        <LinkButton onClick={ toDashboard }>
          <DashboardIcon size="medium" />
          <MenuItemLabel>Dashboard</MenuItemLabel>
        </LinkButton>
      </MenuItem>
      <MenuItem>
        <LinkButton onClick={ toProjectList }>
          <ProjectListIcon size="medium" />
          <MenuItemLabel>Projects</MenuItemLabel>
        </LinkButton>
      </MenuItem>
      <MenuItem>
        <LinkButton onClick={ signOut }>
          <BillingIcon size="medium" />
          <MenuItemLabel>Billing</MenuItemLabel>
        </LinkButton>
      </MenuItem>
      <MenuItem>
        <LinkButton onClick={ signOut }>
          <PaymentIcon size="medium" />
          <MenuItemLabel>Payment Methods</MenuItemLabel>
        </LinkButton>
      </MenuItem>
      <MenuItem>
        <LinkButton onClick={ signOut }>
          <SignOutIcon size="medium" />
          <MenuItemLabel>Sign Out</MenuItemLabel>
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
    signOut: () => actions.closeLayout()
  })
)(LeftMenu)
