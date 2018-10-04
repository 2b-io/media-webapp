import React, { Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Heading, TextLine } from 'ui/typo'
import { Card, ContextMenu, Identicon, Link, List } from 'ui/elements'
import { OwnerAddIcon } from 'ui/icons'
import { DialogRemoveCollaborator } from './dialog'

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Collaborators = ({
  project,
  currentAccount,
  deleteCollaborator,
  identifier,
  hideRemoveCollaboratorDialog,
  showRemoveCollaboratorDialog,
  makeOwner,
  toInviteCollaborator,
  toProfile,
  // ui: {
  //   isRemoveCollaboratorActive
  // }
}) => {
  if(!project) {
    return null
  }

  const { collaborators } = project
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
                    onClick: showRemoveCollaboratorDialog
                  }
                ] }
              />
            ) }
          />
        ) : (
          (signedInCollaborator && signedInCollaborator.privilege === 'admin' && signedInCollaborator._id === _id) ?
            () => (
              <ContextMenu
                name={ `collaborator-${ _id }` }
                content={ () => (
                  <List
                    items={ [
                      {
                        content: () => <TextLine mostLeft mostRight>Leave project</TextLine>,
                        onClick: () => deleteCollaborator(identifier, account._id)
                      }
                    ] }
                  />
                ) }
              />
            ) : null
        )
    })
  )

  return (
    <Fragment>
      <Card
        title={ () => <Heading mostLeft mostRight>Collaborators</Heading> }
        fab={ () => <OwnerAddIcon onClick={ () => toInviteCollaborator(identifier) } /> }
        content={ () => (
          items.length > 0 ?
            <List items={ items } /> :
            <TextLine mostLeft mostRight>No collaborator found</TextLine>
        ) }
      />
      <DialogRemoveCollaborator
        isRemoveCollaboratorActive={ false }
        onConfirm={ () => deleteCollaborator(identifier, account._id) }
        onCancel={ hideRemoveCollaboratorDialog }
      />
    </Fragment>
  )
}

export default connect(
  (state, { identifier }) => ({
    currentAccount: selectors.currentAccount(state),
    project: selectors.findProjectByIdentifier(state, identifier)
  }),
  mapDispatch({
    makeOwner: actions.makeOwner,
    deleteCollaborator: actions.deleteCollaborator,
    toProfile: (id) => actions.requestLocation(`/@${ id }`),
    toInviteCollaborator: (identifier) => actions.requestLocation(`/projects/${ identifier }/invite-collaborator`),
    showRemoveCollaboratorDialog: () => actions.showDialog('REMOVE_COLLABORATOR'),
    hideRemoveCollaboratorDialog: () => actions.hideDialog('REMOVE_COLLABORATOR'),
  })
)(Collaborators)
