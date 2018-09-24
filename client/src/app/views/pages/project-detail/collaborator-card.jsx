import React from 'react'
import styled from 'styled-components'

import { Heading, TextLine } from 'ui/typo'
import { Card, Link, List, MenuMore } from 'ui/elements'
import { OwnerAddIcon } from 'ui/icons'

const LineWithButton = styled.div`
  display: grid;
  & > * {
    min-height: 0;
    min-width: 0;
  };
  height: 40px;
  grid-template-columns: 40px 1fr 40px;
`

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 100%;
  border: 2px solid ${
    ({ theme }) => theme.black.base
  };
  background: ${
    ({ disabled, theme }) => disabled ?
      theme.secondary.base :
      theme.white.base
  };
  width: 24px;
  height: 24px;
`

const Collaborators = ({
  collaborators,
  currentAccount,
  makeOwner,
  showDeleteCollaboratorDialog,
  toInviteCollaboratorModal,
  toProfile
}) => {
  const signedInCollaborator = Object.values(collaborators).find(
    ({ account }) => currentAccount && account._id === currentAccount._id
  )

  const lists = collaborators ? Object.values(collaborators).map(
    ({ _id, account, privilege }) => ({
      key: _id,
      content: () => (
        <LineWithButton>
          <Avatar>
            <Circle />
          </Avatar>
          <TextLine mostLeft mostRight>
            <Link href="#" onClick={ () => toProfile(account._id) } >
              <span>{ account.email }</span>
            </Link>
            { ` (${ privilege === 'owner' && privilege })` }
          </TextLine>
          { signedInCollaborator && signedInCollaborator.privilege === 'owner' && privilege === 'admin' &&
            <MenuMore
              name={ _id }
              content={ () => (
                <List
                  items={ [
                    {
                      content: () => <TextLine mostLeft mostRight onClick={ () => makeOwner(account._id) }>Make owner</TextLine>
                    },
                    {
                      content: () => <TextLine mostLeft mostRight onClick={ () => showDeleteCollaboratorDialog(account._id, account.email) }>Remove</TextLine>
                    }
                  ] }
                />
              ) }
            />
          }
        </LineWithButton>
      )
    })
  ): []

  return (
    <Card
      title={ () => <Heading mostLeft mostRight>Collaborators</Heading> }
      fab={ () => <OwnerAddIcon onClick={ toInviteCollaboratorModal } /> }
      content={ () => (
        lists.length>0 ?
          <List items={ lists } /> :
          <TextLine mostLeft mostRight>No preset found</TextLine>
      ) }
    />
  )
}

export default Collaborators
