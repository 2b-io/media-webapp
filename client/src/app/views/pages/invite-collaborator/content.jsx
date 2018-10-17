import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'

import _InviteCollaboratorForm from './form'

const InviteCollaboratorForm = reduxForm({
  form: 'inviteCollaborator',
  enableReinitialize: true
})(_InviteCollaboratorForm)

const InviteCollaborator = ({
  identifier,
  inviteCollaborator,
  ui: {
    idle
  }
}) => {
  return (
    <Container>
      <InviteCollaboratorForm
        idle={ idle }
        onSubmit={ ({ emails, messenge }) => inviteCollaborator(identifier, { emails, messenge }) }
      />
    </Container>
  )
}
export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)

    return {
      identifier
    }
  },
  mapDispatch({
    inviteCollaborator: actions.inviteCollaborator
  })
)(InviteCollaborator)
