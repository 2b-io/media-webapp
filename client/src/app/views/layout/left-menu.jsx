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
  padding: 10px 5px;
  font-size: 12px;
`

const Menu = styled.ul`
`

const MenuItem = styled.li`
    text-align: center;
    ${
      ({ separator }) => separator && css`
        border-top: 1px solid black;
      `
    }
`

const LinkButton = styled(Link).attrs({
  href: '#'
})`
  height: 40px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
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
        <LinkButton onClick={ toDashboard }>
          <DashboardIcon size="medium" inverted />
        </LinkButton>
      </MenuItem>
      <MenuItem>
        <LinkButton onClick={ toProjectList }>
          <ProjectListIcon size="medium" inverted />
        </LinkButton>
      </MenuItem>
      <MenuItem>
        <LinkButton onClick={ signOut }>
          <BillingIcon size="medium" inverted />
        </LinkButton>
      </MenuItem>
      <MenuItem>
        <LinkButton onClick={ signOut }>
          <PaymentIcon size="medium" inverted />
        </LinkButton>
      </MenuItem>
      <MenuItem>
        <LinkButton onClick={ signOut }>
          <SignOutIcon size="medium" inverted />
        </LinkButton>
      </MenuItem>
      <MenuItem separator={ true }>
        <LinkButton onClick={ toUI }>
          <UiIcon size="medium" inverted />
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
