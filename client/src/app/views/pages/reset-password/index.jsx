import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container } from 'ui/elements'
import { validateConfirmPassword } from 'views/common/validate'
import { DescriptionText } from 'ui/typo'

import StatelessForm from './form'

const ResetPasswordForm = reduxForm({
  form: 'RESET_PASSWORD',
  enableReinitialize: true,
  validate: validateConfirmPassword
})(StatelessForm)

const ResetPassword = ({
  resetPassword,
  ui: {
    account,
    code,
    error,
    idle
  }
}) => {
  if (error) {
    return (
      <Container>
        <DescriptionText mostLeft mostRight align="center">
          This password reset link has expired. Please try again
        </DescriptionText>
      </Container>
    )
  }

  if (!account) {
    return null
  }

  return (
    <Container>
      <ResetPasswordForm
        idle={ idle }
        isFinalizeStep={ !account.isActive }
        initialValues={ account }
        onSubmit={ (account) => resetPassword(code, account) }
      />
    </Container>
  )
}

export default connect(
  null,
  mapDispatch({
    resetPassword: actions.resetPassword
  })
)(ResetPassword)
