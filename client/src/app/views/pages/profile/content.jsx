import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Layout } from 'ui/compounds'
import { Container } from 'ui/elements'
import { ChangePassword } from 'views/common/form'
import { withParams } from 'views/router'
import { validateConfirmPassword } from 'views/common/validate'
import AccountInfo from './account-info'

const PasswordForm = reduxForm({
  form: 'changePassword',
  enableReinitialize: true,
  validate: validateConfirmPassword
})(ChangePassword)

const Profile = ({ account, changePassword, session }) => (
  <main>
    <Layout>
      <Layout.Fluid size="small">
        <Container>
          <AccountInfo account={ account } />
        </Container>
      </Layout.Fluid>
      { session && account && session.account._id === account._id &&
        <Layout.Fixed size="small">
          <Container>
            <PasswordForm
              header={ 'Change password' }
              onSubmit={ changePassword }
            />
          </Container>
        </Layout.Fixed>
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
