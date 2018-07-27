import React from 'react'
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
  fetchPasswordReset,
  params: { code },
  toSignIn,
  ui: { errorGetCode, resultGetcode, errorResetPassword, resultResetPassword }
}) => {

  return (
    <main>
      <Container center size="small">
        { errorGetCode && <React.Fragment>
          <ErrorBox> The code does not exist or expired </ErrorBox>
          <Link href='#' onClick={ () => { toSignIn() } }>Back to login</Link>
        </React.Fragment>
        }
        { resultResetPassword && <SuccessBox>Password reset success</SuccessBox> }
        { errorResetPassword && <ErrorBox>Password reset fail</ErrorBox> }
        { resultGetcode && <React.Fragment>
          <TextBox value={ resultGetcode.email } readOnly />
          <ResetPasswordForm
            resetPassword={ true }
            onSubmit={ ({ password }) => {
              fetchPasswordReset({ password, code })
            } }
          />
        </React.Fragment>
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
        fetchPasswordReset: ({ password, code }) => actions.fetchPasswordReset(password, code),
        toSignIn: () => actions.requestLocation('/sign-in')
      })
    )(ResetPassword)
  )
)
