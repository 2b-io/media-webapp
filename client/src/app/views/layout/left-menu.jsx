import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { actions } from 'state/interface'
import preventDefault from 'services/prevent-default'

import {
  BillingIcon,
  DashboardIcon,
  ProfileIcon,
  ProjectListIcon,
  SignOutIcon
} from 'ui/icons'

const MenuWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: ${
    ({ width }) => `${width}px`
  };
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  font-size: 12px;
`

const Menu = styled.ul`
`

const MenuItem = styled.li`
`

const LinkButton = styled.a.attrs({
  href: '#'
})`
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  text-decoration: none;
  color: inherit;
`

const MenuItemLabel = styled.label`
  margin-left: 10px;
  flex-grow: 1;
`

const LeftMenu = ({ signOut, width }) => (
  <MenuWrapper width={ width }>
    <Menu>
      <MenuItem>
        <LinkButton onClick={ signOut }>
          <DashboardIcon medium />
          <MenuItemLabel>Dashboard</MenuItemLabel>
        </LinkButton>
      </MenuItem>
      <MenuItem>
        <LinkButton onClick={ signOut }>
          <ProfileIcon medium />
          <MenuItemLabel>Profile</MenuItemLabel>
        </LinkButton>
      </MenuItem>
      <MenuItem>
        <LinkButton onClick={ signOut }>
          <ProjectListIcon medium />
          <MenuItemLabel>Projects</MenuItemLabel>
        </LinkButton>
      </MenuItem>
      <MenuItem>
        <LinkButton onClick={ signOut }>
          <BillingIcon medium />
          <MenuItemLabel>Billing</MenuItemLabel>
        </LinkButton>
      </MenuItem>
      <MenuItem>
        <LinkButton onClick={ signOut }>
          <SignOutIcon medium />
          <MenuItemLabel>Sign Out</MenuItemLabel>
        </LinkButton>
      </MenuItem>
    </Menu>
  </MenuWrapper>
)

export default connect(
  null,
  dispatch => ({
    signOut: preventDefault(
      () => dispatch(actions.closeLayout())
    )
  })
)(LeftMenu)
