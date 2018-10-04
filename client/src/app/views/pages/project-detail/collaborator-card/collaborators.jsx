import React, { Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { Heading, TextLine } from 'ui/typo'
import { Card, ContextMenu, Identicon, Link, List } from 'ui/elements'
import { OwnerAddIcon } from 'ui/icons'
import { DialogLeaveProject, DialogMakeOwner } from './dialog'

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
  hideLeaveProjectDialog,
  hideMakeOwnerDialog,
  showLeaveProjectDialog,
  showMakeOwnerDialog,
  makeOwner,
  toInviteCollaborator,
  toProfile,
  ui: {
    isLeaveProjectDialogActive,
    isMakeOwnerDialogActive
  }
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
                    onClick: () => showMakeOwnerDialog({
                      accountId: account._id,
                      identifier
                    })
                  },
                  {
                    content: () => <TextLine mostLeft mostRight>Remove</TextLine>,
                    onClick: () => deleteCollaborator(identifier, account._id)
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
                        onClick: () => showLeaveProjectDialog({
                          accountId: account._id,
                          identifier
                        })
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
      <DialogLeaveProject
        isLeaveProjectDialogActive={ isLeaveProjectDialogActive }
        onConfirm={ ({ accountId, identifier }) => deleteCollaborator(identifier, accountId) }
        onCancel={ hideLeaveProjectDialog }
      />
      <DialogMakeOwner
        isMakeOwnerDialogActive={ isMakeOwnerDialogActive }
        onConfirm={ ({ accountId, identifier }) => makeOwner(accountId, identifier) }
        onCancel={ hideMakeOwnerDialog }
      />
    </Fragment>
  )
}

export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)

    if (!identifier) {
      return {}
    }

    return {
      currentAccount: selectors.currentAccount(state),
      identifier,
      project: selectors.findProjectByIdentifier(state, identifier)

    }
  },
  mapDispatch({
    makeOwner: actions.makeOwner,
    deleteCollaborator: actions.deleteCollaborator,
    toProfile: (id) => actions.requestLocation(`/@${ id }`),
    toInviteCollaborator: (identifier) => actions.requestLocation(`/projects/${ identifier }/invite-collaborator`),
    hideLeaveProjectDialog: () => actions.hideDialog('LEAVE_PROJECT'),
    hideMakeOwnerDialog: () => actions.hideDialog('MAKE_OWNER'),
    showLeaveProjectDialog: (params) => actions.showDialog('LEAVE_PROJECT', params),
    showMakeOwnerDialog: (params) => actions.showDialog('MAKE_OWNER', params)
  })
)(Collaborators)
