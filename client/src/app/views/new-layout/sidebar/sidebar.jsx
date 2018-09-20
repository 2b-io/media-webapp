import React, { Fragment } from 'react'
import styled from 'styled-components'

import { Identicon, List } from 'ui/elements'
import { CloseIcon } from 'ui/icons'
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
  background: ${
    ({ theme }) => theme.white.base
  };
  color: ${
    ({ theme }) => theme.white.on.base
  };
  z-index: 1;
  transform: ${
    ({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'
  };
`

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  appearance: none;
  outline: none;
  border: none;
  background: transparent;
  color: ${ ({ theme }) => theme.white.base };
  padding: 0;
  margin: 0;
  width: 40px;
  height: 40px;
  line-height: 40px;
  z-index: 1;
`

const Content = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-row-gap: 16px;
  height: 100%;

  & > * {
    min-width: 0;
    min-height: 0;
  }
`

const Profile = styled.div`
  position: relative;
`

const UserName = styled.div`
  height: 96px;
  background: ${
    ({ theme }) => theme.black.base
  };
  color: ${
    ({ theme }) => theme.black.on.base
  };
  padding: 56px 0 0 72px;

`

const UserEmail = styled.div`
  padding-left: 72px;
`

const UserAvatar = styled.div`
  position: absolute;
  background: ${
    ({ theme }) => theme.white.base
  };
  color: ${
    ({ theme }) => theme.white.on.base
  };
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
        <CloseButton onClick={ minimizeSidebar }>
          <CloseIcon />
        </CloseButton>
        <Content>
          <Profile className="profile">
            <UserName>
              <TextLine mostLeft mostRight>
                { currentAccount.displayName || 'John Smith' }
              </TextLine>
            </UserName>
            <UserEmail>
              <DescriptionTextLine mostLeft mostRight>
                { currentAccount.email }
              </DescriptionTextLine>
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
