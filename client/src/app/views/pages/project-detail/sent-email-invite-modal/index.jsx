import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container } from 'ui/elements'
import { modal } from 'views/common/decorators'
import { withParams } from 'views/router'

import _SentEmailInviteForm from './form'

const SentEmailInviteForm = reduxForm({
  form: 'sentEmailInviteForm',
  enableReinitialize: true
})(_SentEmailInviteForm)

const CollaboratorInviteEmail = ({
  inviteCollaborator,
  searchAccount,
  modal: { params: { email } }
}) => (
  <Container>
    <SentEmailInviteForm
      initialValues={ { email } }
      onSubmit={ (data) => inviteCollaborator(data) }
      searchAccount={ searchAccount }
    />
  </Container>
)


export default withParams(
  modal({
    name: 'CollaboratorInviteEmail'
  })(
    connect(
      null,
      mapDispatch({
        inviteCollaborator: actions.inviteCollaborator,
        searchAccount: actions.searchAccount,
      })
    )(CollaboratorInviteEmail)
  )
)

