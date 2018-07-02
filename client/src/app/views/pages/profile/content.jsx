import React from 'react'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'
import { withParams } from 'views/router'

import { ChangePassword } from 'views/common/form'
import UserInfo from './userInfo'

const PasswordForm = reduxForm({
  form: 'resetPassword',
  enableReinitialize: true
})(ChangePassword)

const Profile = ({ params: { username } }) => (
  <main>
    <h1>Profile of { username }</h1>
    <Layout>
      <div>
        <UserInfo />
      </div>
      <div>
        <PasswordForm header={ "Change password" } />
      </div>
    </Layout>
  </main>
)

export default withParams(Profile)

const Layout = styled.div`
  &{
    display: grid;
    grid-template-columns: auto 60%;
    padding: 10px;
  }
  @media (max-width: 750px) {
    grid-template-columns: auto;
  }

`
