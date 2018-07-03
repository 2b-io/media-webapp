import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { ChangePassword } from 'views/common/form'
import { withParams } from 'views/router'

import UserInfo from './userInfo'

const PasswordForm = reduxForm({
  form: 'changePassword',
  enableReinitialize: true
})(ChangePassword)

const Profile = ({ changePassword }) => (
  <main>
    {/* <h1>Profile of { username }</h1> */}
    <Layout>
      <Panel>
        <PanelHeader>
          About me
        </PanelHeader>
        <PanelContent>
          <UserInfo />
        </PanelContent>
      </Panel>
      <Panel>
        <PanelHeader>
          Edit profile
        </PanelHeader>
        <PanelContent>
          <PasswordForm
            header={ 'Change password' }
            onSubmit={ ({ currentPassword, password }) => {
              changePassword({ currentPassword, password }) } }
          />
        </PanelContent>
      </Panel>
    </Layout>
  </main>
)

export default connect(
  mapState({
    status: selectors.status
  }),
  mapDispatch({
    changePassword: ({ currentPassword, password }) => actions.changePassword(currentPassword, password),
  })
)(Profile)

const Layout = styled.div`
  &{
    display: grid;
    grid-template-columns: auto 30%;
    padding-top: 10px;
  }
  @media (max-width: 750px) {
    grid-template-columns: auto;
  }
`
const Panel = styled.div`
  &{
    margin-bottom: 20px;
    margin-left: 10px;
    background-color: #fff;
    border: 1px solid;
    border-color: #ddd;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
  }
`
const PanelContent = styled.div`
  &{
    padding: 10px
  }
`
const PanelHeader = styled.div`
  &{
    background-color: #e6e6e6;
    border-color: #ddd;
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
`
