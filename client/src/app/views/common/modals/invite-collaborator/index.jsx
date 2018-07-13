import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container } from 'ui/elements'
import { modal } from 'views/common/decorators'

import _InviteCollaboratorForm from './form'

const InviteCollaboratorForm = reduxForm({
  form: 'preset',
  enableReinitialize: true
})(_InviteCollaboratorForm)

const InviteCollaborator = ({ inviteCollaborator }) => {
  return (
    <Container center>
      <InviteCollaboratorForm onSubmit={ inviteCollaborator } />
    </Container>
  )
}

export default modal({
  name: 'InviteCollaborator'
})(
  connect(
    null,
    mapDispatch({
      inviteCollaborator: actions.inviteCollaborator
    })
  )(InviteCollaborator)
)
