import React, { Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Route } from 'views/router'
import { Heading, TextLine } from 'ui/typo'
import { Button, Card, ContextMenu, Identicon, Link, List, Paragraph } from 'ui/elements'
import { OwnerAddIcon } from 'ui/icons'

import { ConfirmDeleteCollaboratorDialog } from '../dialog'
import CollaboratorInviteEmail from '../sent-email-invite-modal'
import InviteModal from '../invite-modal'

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Collaborators = ({
  collaborators,
  currentAccount,
  deleteCollaborator,
  identifier,
  makeOwner,
  toProjectDetail,
  toInviteCollaboratorModal,
  showDeleteCollaboratorDialog,
  hideDeleteCollaboratorDialog,
  toProfile
}) => {

  const signedInCollaborator = Object.values(collaborators).find(
    ({ account }) => currentAccount && account._id === currentAccount._id
  )

  const items = Object.values(collaborators).map(
    ({ _id, account, privilege }) => ({
      key: _id,
      content: () => (
        <TextLine
          mostRight={ !(signedInCollaborator && signedInCollaborator.privilege === 'owner' && privilege === 'admin') }
        >
          <Link href="#" onClick={ () => toProfile(account._id) } >
            <span>{ account.email }</span>
          </Link>
          { privilege === 'owner' && ` (${ privilege })` }
        </TextLine>
      ),
      leading: () => (
        <Avatar>
          <Identicon circle
            size={ 24 }
            id={ account.email }
          />
        </Avatar>
      ),
      trailing: (signedInCollaborator && signedInCollaborator.privilege === 'owner' && privilege === 'admin') ?
        () => (
          <ContextMenu
            name={ `collaborator-${ _id }` }
            content={ () => (
              <List
                items={ [
                  {
                    content: () => <TextLine mostLeft mostRight>Make owner</TextLine>,
                    onClick: () => makeOwner(account._id, identifier)
                  },
                  {
                    content: () => <TextLine mostLeft mostRight>Remove</TextLine>,
                    onClick: () => showDeleteCollaboratorDialog(account._id, account.email)
                  }
                ] }
              />
            ) }
          />
        ) : null
    })
  )

  return (
    <Fragment>
      <Card
        title={ () => <Heading mostLeft mostRight>Collaborators</Heading> }
        fab={ () => <OwnerAddIcon onClick={ () => toInviteCollaboratorModal(identifier) } /> }
        content={ () => (
          items.length > 0 ?
            <List items={ items } /> :
            <TextLine mostLeft mostRight>No collaborator found</TextLine>
        ) }
      />
      <ConfirmDeleteCollaboratorDialog
        width="narrow"
        content={ ({ params }) => (
          <Paragraph>
            Do you want to remove the account { params.accountEmail } from the project?
          </Paragraph>
        ) }
        choices={ ({ params }) => (
          <Button.Group>
            <Button
              variant="primary"
              onClick={ () => deleteCollaborator(identifier, params.accountId) }>
              Remove
            </Button>
            <Button
              variant="secondary"
              onClick={ hideDeleteCollaboratorDialog }>
              Cancel
            </Button>
          </Button.Group>
        ) }
      />
      <Route path="/projects/:identifier/invite">
        <InviteModal
          width="wide"
          identifier={ identifier }
          title="Invite collaborators"
          onHide={ () => toProjectDetail(identifier) }
          collaborators={ Object.values(collaborators) }
        />
      </Route>
      <Route path="/projects/:identifier/invite-by-email">
        <CollaboratorInviteEmail
          width="wide"
          title="Sent email invite collaborators"
          onHide={ () => toProjectDetail(identifier) }
        />
      </Route>
    </Fragment>
  )
}

export default connect(
  (state) => ({
    currentAccount: selectors.currentAccount(state),
  }),
  mapDispatch({
    makeOwner: actions.makeOwner,
    deleteCollaborator: actions.deleteCollaborator,
    toProfile: (id) => actions.requestLocation(`/@${ id }`),
    toProjectDetail: (identifier) => actions.requestLocation(`/projects/${ identifier }`),
    toInviteCollaboratorModal: (identifier) => actions.requestLocation(`/projects/${ identifier }/invite`),
    showDeleteCollaboratorDialog: (accountId, accountEmail) => actions.showDialog({ dialog: 'ConfirmDeleteCollaboratorDialog', params: { accountId, accountEmail } }),
    hideDeleteCollaboratorDialog: () => actions.hideDialog({ dialog: 'ConfirmDeleteCollaboratorDialog' })
  })
)(Collaborators)
