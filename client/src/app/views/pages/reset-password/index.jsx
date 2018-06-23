import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Modal } from 'ui/compounds'
import { Container } from 'ui/elements'

import _resetPasswordForm from './resetPasswordForm'

const ResetPasswordForm = reduxForm({
  form: 'fetchResetPassword',
  enableReinitialize: true
})(_resetPasswordForm)
// const code = 'c3c5d2fee07750004ed71d0bc9d6d5916f62054b51cf6b0ad2b848c602e77919'
// const id = 'U2FsdGVkX19OgvG3RKzmtuRJKKLBjyA8Kr51Pd3BuLOaBXEZYhDmtl4cMK+KzUIc'
const ResetPassword=({ fetchResetPassword, match, toSignIn, statusResetPassword, error }) => {
  const { code, id } = match.params

  if (!code || !id) {
    return null
  }

  return (
    <main>
      <Container center size="small">
        { !statusResetPassword && <ResetPasswordForm onSubmit={ fetchResetPassword(code, id) } /> }
      </Container>
      {
        statusResetPassword || error &&
          <Modal
            open={ true }
            zIndex={ 10 }
            onClickOutside={ toSignIn }
            onClose={ toSignIn }>
            { () => (
              <div>
                <p>Reset password success!</p>
              </div>
            ) }
          </Modal>
      }
    </main>
  ) }

export default connect(
  mapState({
    statusResetPassword: selectors.statusResetPassword
  }),
  mapDispatch({
    fetchResetPassword: ({ password, code, id }) => actions.fetchResetPassword(password, code, id),
    toSignIn: () => actions.requestLocation('/sign-in')
  })
)(ResetPassword)
