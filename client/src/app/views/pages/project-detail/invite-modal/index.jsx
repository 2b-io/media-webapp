import Debounce from 'lodash.debounce'
import React from 'react'
import { reduxForm } from 'redux-form'
import styled  from 'styled-components'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container, Button, Paragraph } from 'ui/elements'
import { List } from 'ui/compounds'
import { modal } from 'views/common/decorators'

import _InviteCollaboratorForm from './form'

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
`

const CollaboratorItem = styled.li`
  padding: ${
    ({ theme }) => theme.spacing.small
  }
`

const Email = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  padding-right: ${
    ({ theme }) => theme.spacing.small
  };
`

const InviteCollaboratorForm = reduxForm({
  form: 'invite',
  enableReinitialize: true
})(_InviteCollaboratorForm)

const InviteCollaborator = ({
  inviteCollaborator,
  searchAccount,
  collaborators,
  ui: { inputEmail, result }
}) => {

  const filtered = result ? result.filter(
    ({ _id }) => !collaborators.some(
      ({ account }) => _id === account._id
    )
  ) : []

  const checkValidateInputEmail = inputEmail && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputEmail)

  return (
    <Container center>
      <InviteCollaboratorForm
        searchAccount={ Debounce(searchAccount, 500) }
      />
      { filtered && filtered.length ?
        <List>
          { filtered.map( ({ email }, index) => (
            <CollaboratorItem key={ index }>
              <Layout>
                <Email>{ email }</Email>
                <Button
                  plain
                  type="submit"
                  onClick={ () => { inviteCollaborator(email) } }>
                    Invite
                </Button>
              </Layout>
            </CollaboratorItem>
          )) }
        </List> :
        <List>
          <CollaboratorItem>
            <Layout>
              <Paragraph> { checkValidateInputEmail && inputEmail ?
                `${inputEmail} No data ...`:
                'The email is invalid or already exists' }
              </Paragraph>
              { checkValidateInputEmail &&
                <Button
                  plain
                  type="submit"
                  //This action will create the user set to admin and sent email to invite
                  onClick={ () => { inviteCollaborator(inputEmail) } }>
                    Sent email to invite
                </Button>
              }
            </Layout>
          </CollaboratorItem>
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
