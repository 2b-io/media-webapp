import React, { Fragment } from 'react'
import styled from 'styled-components'

import { Identicon, List } from 'ui/elements'
import { MenuIcon } from 'ui/icons'
import { DescriptionTextLine, TextLine } from 'ui/typo'

import {
  BillingIcon,
  DashboardIcon,
  PaymentIcon,
  ProjectListIcon,
  SignOutIcon
} from 'ui/icons'

const easingFunc = 'cubic-bezier(.4, 0, .2, 1)'

const Surface = styled.div`
  position: absolute;
  width: 40px;
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
  transition: transform .3s ${ easingFunc };
  @media (max-width: 599px) {
    display: none;
  }
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
  grid-row-gap: 40px;
  height: 100%;

  & > * {
    min-width: 0;
    min-height: 0;
  }
`

const Profile = styled.div`
  position: relative;
  height: 96px;
  background: ${
    ({ theme }) => theme.black.base
  };
`

const UserAvatar = styled.div`
  position: absolute;
  background: ${
    ({ theme }) => theme.white.base
  };
  color: ${
    ({ theme }) => theme.white.on.base
  };
  width: 40px;
  height: 40px;
  bottom: -8px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`

const Sidebar = ({
  currentAccount = {},
  maximizeSidebar,
  open,
  projectCount = 0,
  signOut,
  toDashboard,
  toProfile,
  toProjectList
}) => {
  const menuItems = [ {
    onClick: toDashboard,
    leading: () => <DashboardIcon />,
  }, {
    onClick: toProjectList,
    leading: () => <ProjectListIcon />,
  }, {
    leading: () => <BillingIcon />,
  }, {
    leading: () => <PaymentIcon />,
  }, {
    onClick: signOut,
    leading: () => <SignOutIcon />,
  } ]

  return (
    <Fragment>
      <Surface open={ open }>
        <MenuButton onClick={ maximizeSidebar }>
          <MenuIcon />
        </MenuButton>
        <Content>
          { currentAccount && (
            <Profile>
              <UserAvatar onClick={ () => toProfile(currentAccount.identifier) }>
                <Identicon circle
                  size={ 40 }
                  id={ currentAccount.email }
                />
              </UserAvatar>
            </Profile>
          ) }
          <div className="menu">
            <List items={ menuItems } />
          </div>
        </Content>
      </Surface>
    </Fragment>
  )
}

export default Sidebar
