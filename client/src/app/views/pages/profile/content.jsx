import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import styled from 'styled-components'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { ChangePassword } from 'views/common/form'
import { withParams } from 'views/router'

import AccountInfo from './account-info'

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
const PasswordForm = reduxForm({
  form: 'changePassword',
  enableReinitialize: true
})(ChangePassword)

const Profile = ({ account, changePassword, session }) => (
  <main>
    <Layout>
      <Panel>
        <PanelHeader>
          About me
        </PanelHeader>
        <PanelContent>
          <AccountInfo account={ account } />
        </PanelContent>
      </Panel>
      {
        session && account && session.account._id === account._id &&
          <Panel>
            <PanelHeader>
              Edit profile
            </PanelHeader>
            <PanelContent>
              <PasswordForm
                header={ 'Change password' }
                onSubmit={ changePassword }
              />
            </PanelContent>
          </Panel>
      }
    </Layout>
  </main>
)

export default withParams(
  connect(
    (state, { params: { id } }) => ({
      account: selectors.findAccountById(
        state,
        id,
        selectors.currentSession(state)
      ),
      session: selectors.currentSession(state)
    }),
    mapDispatch({
      changePassword: ({ currentPassword, password }) => actions.changePassword(currentPassword, password),
    })
  )(Profile)
)
