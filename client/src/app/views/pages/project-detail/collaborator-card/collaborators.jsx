import React, { Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { DescriptionTextLine, Heading, TextLine } from 'ui/typo'
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
  if (!project) {
    return null
  }

  const { collaborators } = project

  const signedInCollaborator = Object.values(collaborators).find(
    ({ account }) => currentAccount && account.identifier === currentAccount.identifier
  )

  const items = Object.values(collaborators).map(
    ({ account, privilege }) => ({
      key: account.identifier,
      content: () => (
        <div>
          <TextLine
            mostRight={ !(signedInCollaborator && signedInCollaborator.privilege === 'owner' && privilege === 'admin') }
          >
            <Link href="#" onClick={ () => toProfile(account.identifier) } >
              { account.name }
            </Link>
            { !account.isActive && ' (pending)' }
            { privilege === 'owner' && ` (${ privilege })` }
          </TextLine>
          <DescriptionTextLine
            mostRight={ !(signedInCollaborator && signedInCollaborator.privilege === 'owner' && privilege === 'admin') }
          >
            { account.email }
          </DescriptionTextLine>
        </div>
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
            name={ `collaborator-${ account.identifier }` }
            content={ () => (
              <List
                items={ [
                  account.isActive ? {
                    content: () => <TextLine mostLeft mostRight>Make owner</TextLine>,
                    onClick: () => showMakeOwnerDialog({
                      accountId: account.identifier,
                      identifier,
                      account,
                      project
                    })
                  } : null,
                  {
                    content: () => <TextLine mostLeft mostRight>Remove</TextLine>,
                    onClick: () => deleteCollaborator(identifier, account.identifier)
                  }
                ] }
              />
            ) }
          />
        ) : (
          (signedInCollaborator && signedInCollaborator.privilege === 'admin' && signedInCollaborator.account.identifier === account.identifier) ?
            () => (
              <ContextMenu
                name={ `collaborator-${ account.identifier }` }
                content={ () => (
                  <List
                    items={ [
                      {
                        content: () => <TextLine mostLeft mostRight>Leave project</TextLine>,
                        onClick: () => showLeaveProjectDialog({
                          accountId: account.identifier,
                          identifier,
                          project
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
        fab={ () => <OwnerAddIcon /> }
        fabClick={ () => toInviteCollaborator(identifier) }
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
    toProfile: (identifier) => actions.requestLocation(`/@${ identifier }`),
    toInviteCollaborator: (identifier) => actions.requestLocation(`/projects/${ identifier }/invite-collaborator`),
    hideLeaveProjectDialog: () => actions.hideDialog('LEAVE_PROJECT'),
    hideMakeOwnerDialog: () => actions.hideDialog('MAKE_OWNER'),
    showLeaveProjectDialog: (params) => actions.showDialog('LEAVE_PROJECT', params),
    showMakeOwnerDialog: (params) => actions.showDialog('MAKE_OWNER', params)
  })
)(Collaborators)
