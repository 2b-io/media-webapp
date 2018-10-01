import React, { Fragment } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { ChangePassword } from 'views/common/form'
import { Container, TextBox, Break } from 'ui/elements'
import { ErrorBox, SuccessBox } from 'ui/elements'
import { EmailIcon } from 'ui/icons'
import { validateConfirmPassword } from 'views/common/validate'
import { withParams } from 'views/router'

const ResetPasswordForm = reduxForm({
  form: 'resetPassword',
  enableReinitialize: true,
  validate: validateConfirmPassword
})(ChangePassword)

const ResetPassword = ({
  resetPassword,
  params: { code },
  ui: { errorGetCode, resultGetcode, errorResetPassword, resultResetPassword }
}) => (
  <Container center size="small">
    { errorGetCode &&
      <ErrorBox>The reset code does not exist or it has been expired.</ErrorBox>
    }
    { resultResetPassword &&
      <SuccessBox>Password changed. Please use your new password in your next sign in.</SuccessBox>
    }
    { errorResetPassword &&
      <ErrorBox>An error happens when changing your password. Please try again.</ErrorBox>
    }
    { resultGetcode && !resultResetPassword &&
      <Fragment>
        <TextBox readOnly
          value={ resultGetcode.email }
          leading={ () => <EmailIcon /> }
        />
        <Break />
        <ResetPasswordForm
          resetPassword={ true }
          onSubmit={ ({ password }) => {
            resetPassword({ password, code })
          } }
        />
      </Fragment>
    }
  </Container>
)

export default withParams(
  connect(
    null,
    mapDispatch({
      resetPassword: ({ password, code }) => actions.resetPassword(password, code)
    })
  )(ResetPassword)
)
