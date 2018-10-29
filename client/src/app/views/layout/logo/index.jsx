import React from 'react'
import styled from 'styled-components'

const LogoInside = styled.div`
  width: 80px;
  height: 80px;
  background: white;
`

const Logo = styled.div.attrs({
  children: () => <LogoInside />
})`
  width: 112px;
  height: 112px;
  background: #07f;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

export default Logo
