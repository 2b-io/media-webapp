import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { PaypalButton } from 'ui/elements'

const Layout = styled.section`
  padding: 16px;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
  background: #e6e6e6;
`

const Payment = () => (
  <Layout>
    <PaypalButton />
  </Layout>
)

export default connect()(Payment)
