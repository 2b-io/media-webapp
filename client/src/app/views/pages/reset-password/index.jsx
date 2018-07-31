import React, { Fragment } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { ChangePassword } from 'views/common/form'
import { Container, TextBox, Link, ErrorBox, SuccessBox } from 'ui/elements'
import { stateful } from 'views/common/decorators'
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
  toSignIn,
  ui: { errorGetCode, resultGetcode, errorResetPassword, resultResetPassword }
}) => {

  return (
    <main>
      <Container center size="small">
        { errorGetCode && <Fragment>
          <ErrorBox> The code does not exist or expired </ErrorBox>
          <Link href='/sign-in' onClick={ toSignIn }>Back to login</Link>
        </Fragment>
        }
        { resultResetPassword && <SuccessBox>Password reset success</SuccessBox> }
        { errorResetPassword && <ErrorBox>Password reset fail</ErrorBox> }
        { resultGetcode && <Fragment>
          <TextBox value={ resultGetcode.email } readOnly />
          <ResetPasswordForm
            resetPassword={ true }
            onSubmit={ ({ password }) => {
              resetPassword({ password, code })
            } }
          />
          <Link href='/sign-in' onClick={ toSignIn }>Back to login</Link>
        </Fragment>
        }
      </Container>
    </main>
  ) }
export default withParams(
  stateful({
    component: 'ResetPassword'
  })(
    connect(
      null,
      mapDispatch({
        resetPassword: ({ password, code }) => actions.resetPassword(password, code),
        toSignIn: () => actions.requestLocation('/sign-in')
      })
    )(ResetPassword)
  )
)
