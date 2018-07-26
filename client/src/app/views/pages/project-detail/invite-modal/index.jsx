import Debounce from 'lodash.debounce'
import React from 'react'
import { reduxForm } from 'redux-form'
import styled  from 'styled-components'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container, Button, Layout } from 'ui/elements'
import { List } from 'ui/compounds'
import { modal } from 'views/common/decorators'

import _InviteCollaboratorForm from './form'

const InviteCollaboratorForm = reduxForm({
  form: 'invite',
  enableReinitialize: true
})(_InviteCollaboratorForm)

const InviteCollaborator = ({
  inviteCollaborator,
  searchAccount,
  ui: { error, result }
}) => {
  return (
    <Container center>
      <InviteCollaboratorForm
        searchAccount={ Debounce(searchAccount, 500) }
      />
      { result?
        <List>
          { result.map( ({ email }, index) => (
            <List.Item key={ index }>
              <Layout>
                <Layout.Fixed>
                  <span>{ email }</span>
                </Layout.Fixed>
                <Layout.Fluid>
                  <Button
                    plain
                    type="submit"
                    onClick={ () => { inviteCollaborator(email) } }>
                      Invite
                  </Button>
                </Layout.Fluid>
              </Layout>
            </List.Item>
          )) }
        </List> :
        <List>
          <List.Item>
            No data collaborator ...
          </List.Item>
        </List>
      }
    </Container>
  )
}

export default modal({
  name: 'InviteCollaborator'
})(
  connect(
    null,
    mapDispatch({
      inviteCollaborator: (email) => actions.inviteCollaborator(email),
      searchAccount: actions.searchAccount
    })
  )(InviteCollaborator)
)
