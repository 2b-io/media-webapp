import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'
import { validateConfirmPassword } from 'views/common/validate'

import StatelessChangePasswordForm from './form'

const ChangePasswordForm = reduxForm({
  form: 'changePasswordForm',
  validate: validateConfirmPassword
})(StatelessChangePasswordForm)

const ChangePassword = ({
  account,
  session,
  changePassword
}) => (
  <Container>
    { account && session && session.account && session.account.identifier === account.identifier &&
      <ChangePasswordForm
        onSubmit={ changePassword }
      />
    }
  </Container>
)

export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)
    const session = selectors.currentSession(state)

    return {
      account: selectors.findAccountById(state, identifier),
      session
    }
  },
  mapDispatch({
    changePassword: ({ currentPassword, password }) => actions.changePassword(currentPassword, password)
  })
)(ChangePassword)
