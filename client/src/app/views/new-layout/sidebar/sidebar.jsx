import React, { Fragment } from 'react'
import styled from 'styled-components'

import { Identicon, List } from 'ui/elements'
import { DescriptionTextLine, TextLine } from 'ui/typo'

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
}) => {
  const menuItems = [ {
    onClick: toDashboard,
    leading: () => <DashboardIcon />,
    content: () => <TextLine mostRight>Dashboard</TextLine>
  }, {
    onClick: toProjectList,
    leading: () => <ProjectListIcon />,
    content: () => <TextLine mostRight>Projects</TextLine>
  }, {
    leading: () => <BillingIcon />,
    content: () => <TextLine mostRight>Billing</TextLine>
  }, {
    leading: () => <PaymentIcon />,
    content: () => <TextLine mostRight>Payment Methods</TextLine>
  }, {
    onClick: signOut,
    leading: () => <SignOutIcon />,
    content: () => <TextLine mostRight>Sign Out</TextLine>
  } ]

  return (
    <Fragment>
      { open && <Overlay onClick={ minimizeSidebar } /> }
      <Surface open={ open }>
        <Content>
          <Profile className="profile">
            <UserName>
              <TextLine>{ currentAccount.displayName || 'John Smith' }</TextLine>
            </UserName>
            <UserEmail>
              <DescriptionTextLine>{ currentAccount.email }</DescriptionTextLine>
            </UserEmail>
            <UserAvatar>
              <Identicon circle
                size={ 56 }
                id={ currentAccount.email }
              />
            </UserAvatar>
          </Profile>
          <div className="menu">
            <List items={ menuItems } />
          </div>
        </Content>
      </Surface>
    </Fragment>
  )
}

export default Sidebar
