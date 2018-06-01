import React from 'react'
import styled from 'styled-components'

import logo from 'img/logo_white.png'

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
`

const LogoWrapper = styled.div`
  width: ${
    ({ menuWidth }) => `${ menuWidth }px`
  };
  text-align: center;
  padding: 10px;
  flex-shrink: 0;
`

const Logo = styled.img`
  display: inline-block;
  max-height: 100%;
  max-width: 100%;
`

const Menu = styled.ul`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-items: center;
  flex-grow: 1;
`

const MenuItem = styled.li`
  margin-right: 20px;
  display: flex;
  align-items: center;
`

const Link = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 12px;
`

const TopMenu = ({ menuWidth }) => (
  <Wrapper>
    <LogoWrapper menuWidth={ menuWidth }>
      <Logo src={ logo } />
    </LogoWrapper>
    <Menu>
      <MenuItem>
        <Link href="/#">Docs</Link>
      </MenuItem>
      <MenuItem>
        <Link href="/#">Tools</Link>
      </MenuItem>
      <MenuItem>
        <Link href="/#">Other Services</Link>
      </MenuItem>
    </Menu>
  </Wrapper>
)

export default TopMenu
