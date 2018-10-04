import React, { Fragment } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { ChangePassword } from 'views/common/form'
import { Container, TextBox, Break } from 'ui/elements'
import { ErrorBox, SuccessBox } from 'ui/elements'
import { EmailIcon } from 'ui/icons'
import { validateConfirmPassword } from 'views/common/validate'
import { withParams } from 'views/router'

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
    code
  }
}) => {
  if (!account) {
    return null
  }

  return (
    <Container>
      <ResetPasswordForm
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
