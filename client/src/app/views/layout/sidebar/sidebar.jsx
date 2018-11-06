import React from 'react'
import styled, { css } from 'styled-components'

import { Badge, Identicon, List } from 'ui/elements'
import { DescriptionTextLine, TextLine } from 'ui/typo'

import {
  ActivityIcon,
  // BillingIcon,
  CloseIcon,
  DashboardIcon,
  MenuIcon,
  // PaymentIcon,
  ProjectListIcon,
  SignOutIcon
} from 'ui/icons'

const easingFunc = 'cubic-bezier(.4, 0, .2, 1)'

const Surface = styled.div`
  position: absolute;
  overflow: hidden;
  width: ${
    ({ open }) => open ?
      '280px' :
      '0'
  };

  @media (min-width: 600px) {
    width: ${
      ({ open }) => open ?
        '280px' :
        '40px'
    };
  }

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
  transition: width .3s ${ easingFunc };
`

const MenuButton = styled.button`
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
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition:
    width .3s ${ easingFunc },
    height .3s ${ easingFunc },
    left .3s ${ easingFunc },
    bottom .3s ${ easingFunc };

  width: 64px;
  height: 64px;
  left: 8px;
  bottom: 8px;

  @media (min-width: 600px) {
    ${
      ({ open }) => open ?
        css`
          width: 64px;
          height: 64px;
          left: 8px;
          bottom: 8px;
        ` :
        css `
          width: 40px;
          height: 40px;
          left: 0px;
          bottom: 8px;
        `
    }
  }
`

const Sidebar = ({
  currentAccount = {},
  minimizeSidebar,
  maximizeSidebar,
  open,
  projectCount = 0,
  signOut,
  toDashboard,
  toProfile,
  toProjectList,
  toReportPage
}) => {
  const menuItems = [ {
    onClick: toDashboard,
    leading: () => <DashboardIcon />,
    content: () => <TextLine mostRight>Dashboard</TextLine>
  }, {
    onClick: toProjectList,
    leading: () => <ProjectListIcon />,
    trailing: () => projectCount ?
      <Badge content={ projectCount } /> :
      null,
    content: () => <TextLine mostRight={ !projectCount }>Projects</TextLine>
  }, {
    onClick: toReportPage,
    leading: () => <ActivityIcon />,
    content: () => <TextLine mostRight>Reports</TextLine>
  // }, {
  //   leading: () => <BillingIcon />,
  //   content: () => <TextLine mostRight>Billing</TextLine>
  // }, {
  //   leading: () => <PaymentIcon />,
  //   content: () => <TextLine mostRight>Payment Methods</TextLine>
  }, {
    onClick: signOut,
    leading: () => <SignOutIcon />,
    content: () => <TextLine mostRight>Sign Out</TextLine>
  } ]

  return (
    <Surface open={ open }>
      <MenuButton onClick={ open ? minimizeSidebar : maximizeSidebar }>
        { open ? <CloseIcon /> : <MenuIcon /> }
      </MenuButton>
      <Content>
        { currentAccount && (
          <Profile>
            <UserName>
              <TextLine mostLeft mostRight>
                { currentAccount.name }
              </TextLine>
            </UserName>
            <UserEmail>
              <DescriptionTextLine mostLeft mostRight>
                { currentAccount.email }
              </DescriptionTextLine>
            </UserEmail>
            <UserAvatar
              open={ open }
              onClick={ () => toProfile(currentAccount.identifier) }>
              <Identicon circle
                size={ open ? 56 : 32 }
                id={ currentAccount.email }
              />
            </UserAvatar>
          </Profile>
        ) }
        <div className='menu'>
          <List items={ menuItems } />
        </div>
      </Content>
    </Surface>
  )
}

export default Sidebar
