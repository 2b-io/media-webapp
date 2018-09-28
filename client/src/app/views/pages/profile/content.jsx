import React from 'react'
import styled from 'styled-components'

const Layout = styled.section`
  padding: 16px;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
  background: #e6e6e6;
`

const Container = styled.div`
  display: grid;
  & > * {
    min-height: 0;
    min-width: 0;
  }
  height: 24px;
  grid-gap: 16px;
  grid-template-columns: 100%;
  background: ${ ({ theme }) => theme.white.base };
`

const Profile = () => (
  <Layout>
    <Container>
    </Container>
  </Layout>
)

export default Profile
