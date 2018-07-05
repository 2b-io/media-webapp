import React from 'react'
import styled from 'styled-components'

import { TextBox } from 'ui/elements'

const AccountInfo = ({ account }) => (
  <Layout>
    <span>Email</span>
    <TextBox
      disabled={ true }
      defaultValue={ account && account.email }
    />
  </Layout>
)

export default AccountInfo

const Layout = styled.div`
  &{
    display: grid;
    grid-template-columns: 20% auto auto auto auto;
    padding: 10px 10px 10px 10px;
  }
  @media (max-width: 750px) {
    grid-template-columns: auto;
  }
`
