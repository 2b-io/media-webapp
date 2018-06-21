import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'
import { Modal } from 'ui/compounds'
import { mapDispatch, mapState } from 'services/redux-helpers'
import _resetPasswordForm from './resetPasswordForm'

const ResetPasswordForm = reduxForm({
    form: 'fetchResetPassword',
    enableReinitialize: true
  })(_resetPasswordForm)
const code = "c3c5d2fee07750004ed71d0bc9d6d5916f62054b51cf6b0ad2b848c602e77919"
const id = "U2FsdGVkX19OgvG3RKzmtuRJKKLBjyA8Kr51Pd3BuLOaBXEZYhDmtl4cMK+KzUIc"
const ResetPassword=({ fetchResetPassword,match,toSignIn,statusResetPassword,error }) => {
  return (
    <main>
      <Container center size="small">
      {!statusResetPassword?<ResetPasswordForm onSubmit={ fetchResetPassword }/>:''}
      </Container>
      {statusResetPassword||error?  <Modal
        open={true}
        zIndex={10}
        onClickOutside={() => {toSignIn}}
        onClose={() => {toSignIn}}
        >
          {(error) => (
            <div>
              <p>
                Reset password success!
              </p>
            </div>
          )}
        </Modal>:''}
    </main>
  )}

export default connect(
 mapState({
  statusResetPassword: selectors.statusResetPassword
 }),
 mapDispatch({
  fetchResetPassword: ({password}) => actions.fetchResetPassword(password,code,id),
  toSignIn: () => actions.requestLocation('/sign-in')
 })
)(ResetPassword)
