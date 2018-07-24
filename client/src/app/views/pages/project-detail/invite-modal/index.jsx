import Debounce from 'lodash.debounce'
import React from 'react'
import { reduxForm } from 'redux-form'
import styled  from 'styled-components'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container, Button, Layout } from 'ui/elements'
import { modal } from 'views/common/decorators'


import _InviteCollaboratorForm from './form'

const List = styled.div`
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
      { result &&
        <List>
          { result.map( ({ email }, index) => (
            <Item key={ index }>
              <Layout>
                <Layout.Fixed>
                  <span>{ email }</span>
                </Layout.Fixed>
                <Layout.Fluid>
                  <Button
                    type="submit"
                    onClick={ () => { inviteCollaborator(email) } }>
                      Invite
                  </Button>
                </Layout.Fluid>
              </Layout>
            </Item>
          )) }
        </List> }
      { error && <p> Error search account please try again </p> }
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
