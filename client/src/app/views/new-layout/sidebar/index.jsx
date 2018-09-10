import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Identicon } from 'ui/elements'
import { AssistiveTextLine, TextLine } from 'ui/typo'

import {
  BillingIcon,
  DashboardIcon,
  PaymentIcon,
  ProjectListIcon,
  SignOutIcon
} from 'ui/icons'

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .3);
  z-index: 1;
`

const Surface = styled.div`
  position: absolute;
  width: 280px;
  top: 0;
  bottom: 0;
  left: 0;
  background: #fff;
  z-index: 1;
  transform: ${
    ({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'
  };
`

const Content = styled.div`
  display: grid;
  grid-template-rows: 96px 1fr;
  height: 100%;

  & > * {
    min-width: 0;
    min-height: 0;
  }
`

const List = styled.ul`
  display: grid;
  grid-template-columns: 100%
  grid-auto-rows: 40px;
`

List.Item = styled.li`
  display: grid;
  grid-template-columns: 40px 1fr;

  & > * {
    min-width: 0;
    min-height: 0;
  }
`

List.Icon = styled.div`
  display: flex;
  align-items: center;
`

List.Text = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
`

const Profile = styled.div`
  position: relative;
  height: 96px;
`

const UserName = styled.div`
  height: 64px;
  background: #666;
  padding: 24px 8px 0 80px;
  color: #fff;
`

const UserEmail = styled.div`
  padding: 0 8px 0 80px;
`

const UserAvatar = styled.div`
  position: absolute;
  background: white;
  width: 64px;
  height: 64px;
  bottom: 8px;
  left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`

const Sidebar = ({
  currentAccount = {},
  minimizeSidebar,
  open,
  signOut,
  toDashboard,
  toProjectList
}) => (
  <Fragment>
    { open && <Overlay onClick={ minimizeSidebar } /> }
    <Surface open={ open }>
      <Content>
        <Profile className="profile">
          <UserName>
            <TextLine>{ currentAccount.displayName || 'John Smith' }</TextLine>
          </UserName>
          <UserEmail>
            <AssistiveTextLine>{ currentAccount.email }</AssistiveTextLine>
          </UserEmail>
          <UserAvatar>
            <Identicon circle
              size={ 56 }
              id={ currentAccount.email }
            />
          </UserAvatar>
        </Profile>
        <div className="menu">
          <List>
            <List.Item onClick={ toDashboard }>
              <List.Icon>
                <DashboardIcon />
              </List.Icon>
              <List.Text>
                <TextLine>Dashboard</TextLine>
              </List.Text>
            </List.Item>
            <List.Item onClick={ toProjectList }>
              <List.Icon>
                <ProjectListIcon />
              </List.Icon>
              <List.Text>
                <TextLine>Projects</TextLine>
              </List.Text>
            </List.Item>
            <List.Item>
              <List.Icon>
                <BillingIcon />
              </List.Icon>
              <List.Text>
                <TextLine>Billing</TextLine>
              </List.Text>
            </List.Item>
            <List.Item>
              <List.Icon>
                <PaymentIcon />
              </List.Icon>
              <List.Text>
                <TextLine>Payment Methods</TextLine>
              </List.Text>
            </List.Item>
            <List.Item onClick={ signOut }>
              <List.Icon>
                <SignOutIcon />
              </List.Icon>
              <List.Text>
                <TextLine>Sign Out</TextLine>
              </List.Text>
            </List.Item>
          </List>
        </div>
      </Content>
    </Surface>
  </Fragment>
)

export default connect(
  mapState({
    open: selectors.isSidebarOpen,
    currentAccount: selectors.currentAccount
  }),
  mapDispatch({
    minimizeSidebar: actions.minimizeSidebar,
    toDashboard: () => actions.requestLocation('/'),
    toProjectList: () => actions.requestLocation('/projects'),
    toUI: () => actions.requestLocation('/ui'),
    signOut: () => actions.closeLayout()
  })
)(Sidebar)
