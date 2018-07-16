import React from 'react'
import { reduxForm } from 'redux-form'
import styled  from 'styled-components'
import { connect } from 'react-redux'

import { mapDispatch, mapState } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'
import { modal } from 'views/common/decorators'

import _InviteCollaboratorForm from './form'

const ListItem = styled.div`
  background-color: #efefef;
  padding: 10px;
  margin: 20px auto;
  border-radius: 2px;
  align-self: flex-start;
`
const Item = styled.div`
  margin: 5px auto;
  cursor: pointer;
`

const InviteCollaboratorForm = reduxForm({
  form: 'invite',
  enableReinitialize: true
})(_InviteCollaboratorForm)

const InviteCollaborator = ({ inviteCollaborator, findCollaborator, collaborators, email, selectEmaiCollaborator }) => {
  return (
    <Container center>
      <InviteCollaboratorForm onSubmit={ inviteCollaborator } findCollaborator={ findCollaborator } email={ email } />
      { collaborators.length && <ListItem>
        { collaborators.map( (collaborator, index) => (
          <Item key={ index } onClick={ () => { selectEmaiCollaborator(collaborator.email) } }>
            { collaborator.email }
          </Item>
        )) }
      </ListItem> }
    </Container>
  )
}

export default modal({
  name: 'InviteCollaborator'
})(
  connect(
    mapState({
      collaborators: selectors.collaborators,
      email: selectors.emailCollaborator
    }),
    mapDispatch({
      inviteCollaborator: actions.inviteCollaborator,
      findCollaborator: actions.findCollaborator,
      selectEmaiCollaborator: actions.selectEmaiCollaborator
    })
  )(InviteCollaborator)
)
