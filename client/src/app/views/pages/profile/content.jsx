import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Layout, Panel, TitleBar } from 'ui/compounds'
import { Container, ErrorBox } from 'ui/elements'
import { ChangePassword } from 'views/common/form'
import { stateful } from 'views/common/decorators'
import { withParams } from 'views/router'
import { validateConfirmPassword } from 'views/common/validate'
import AccountInfo from './account-info'

const PasswordForm = reduxForm({
  form: 'changePassword',
  enableReinitialize: true,
  validate: validateConfirmPassword
})(ChangePassword)

const Profile = ({
  account,
  changePassword,
  session,
  ui: { error }
}) => (
  <main>
    <Layout>
      <Layout.Fluid size="small">
        <Container>
          <Panel>
            <Panel.Header>
              <TitleBar>
                <TitleBar.Title>
                  <h2>Profile Info</h2>
                </TitleBar.Title>
              </TitleBar>
            </Panel.Header>
            <Panel.Content>
              <Container>
                <AccountInfo account={ account } />
              </Container>
            </Panel.Content>
          </Panel>
        </Container>
      </Layout.Fluid>
      { session && account && session.account._id === account._id &&
        <Layout.Fixed size="small">
          <Container>
            <Panel>
              <Panel.Header>
                <TitleBar>
                  <TitleBar.Title>
                    <h2>Change Password</h2>
                  </TitleBar.Title>
                </TitleBar>
              </Panel.Header>
              <Panel.Content>
                <Container>
                  { error &&
                    <ErrorBox>{ 'Change password failed' }</ErrorBox>
                  }
                  <PasswordForm
                    header={ 'Change password' }
                    onSubmit={ changePassword }
                  />
                </Container>
              </Panel.Content>
            </Panel>
          </Container>
        </Layout.Fixed>
      }
    </Layout>
  </main>
)

export default withParams(
  stateful({
    component: 'ChangePassword'
  })(
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
)
