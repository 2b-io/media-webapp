import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import styled from 'styled-components'

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


const CenterDescriptionText = styled(DescriptionText)`
  text-align: center;
`

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
        <CenterDescriptionText mostLeft mostRight>
          This password reset link has expired. Please try again
        </CenterDescriptionText>
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
