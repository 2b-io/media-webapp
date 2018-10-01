import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'
import { stateful } from 'views/common/decorators'

import _InviteCollaboratorForm from './form'

const InviteCollaboratorForm = reduxForm({
  form: 'inviteCollaborator',
  enableReinitialize: true
})(_InviteCollaboratorForm)

const InviteCollaborator = ({
  inviteCollaborator,
  identifier
}) => {
  return (
    <Container>
      <InviteCollaboratorForm
        onClick={ () => { inviteCollaborator({ email, messenge: '' }) } }
      />
    </Container>
  )
}
export default stateful({
  component: 'InviteCollaborator'
})(
  connect(
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
)
