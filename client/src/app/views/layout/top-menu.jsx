import React from 'react'
import styled from 'styled-components'

import logo from 'img/logo_white.png'

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
`

const LogoWrapper = styled.div`
  width: 100px;
  text-align: center;
`

const Logo = styled.img`
  display: inline-block;
  height: 50px;
`

const TopMenu = () => (
  <Wrapper>
    <LogoWrapper>
      <Logo src={ logo } />
    </LogoWrapper>
  </Wrapper>
)

export default TopMenu
