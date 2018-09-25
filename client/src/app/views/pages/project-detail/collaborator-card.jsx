import React from 'react'
import styled from 'styled-components'

import { Heading, TextLine } from 'ui/typo'
import { Card, ContextMenu, Identicon, Link, List } from 'ui/elements'
import { OwnerAddIcon } from 'ui/icons'

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Collaborators = ({
  collaborators = {},
  currentAccount,
  makeOwner,
  showDeleteCollaboratorDialog,
  toInviteCollaboratorModal,
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
          { `(${ privilege === 'owner' && privilege })` }
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
                    onClick: () => makeOwner(account._id)
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
    <Card
      title={ () => <Heading mostLeft mostRight>Collaborators</Heading> }
      fab={ () => <OwnerAddIcon onClick={ toInviteCollaboratorModal } /> }
      content={ () => (
        items.length > 0 ?
          <List items={ items } /> :
          <TextLine mostLeft mostRight>No collaborator found</TextLine>
      ) }
    />
  )
}

export default Collaborators
