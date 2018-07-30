import React from 'react'
import styled from 'styled-components'

import { List } from 'ui/compounds'
import { Button, Link } from 'ui/elements'

const Wrapper = styled.div`
  display: flex;
`

const LeftStyled = styled.div`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const RightStyled = styled.div`
  flex-grow: 0;
`

const PrivilegeValue = styled.span`
  padding: ${
    ({ theme }) => `0 ${ theme.spacing.small }`
  };
`

const CollaboratorList = ({ collaborators, toProfile, currentAcount, makeOwner }) => {
  const signedInCollaborator = Object.values(collaborators).find(
    ({ account }) => currentAcount && account._id === currentAcount._id
  )

  return (
    <List>
      {
        Object.values(collaborators).map(
          ({ _id, account, privilege }) => (
            <List.Item key={ _id }>
              <Wrapper>
                <LeftStyled>
                  <Link href="#" onClick={ () => toProfile(account._id) } >
                    <span>{ account.email }</span>
                  </Link>
                </LeftStyled>
                <RightStyled>
                  { privilege === 'owner' &&
                    <PrivilegeValue>{ privilege }</PrivilegeValue>
                  }
                  { signedInCollaborator && signedInCollaborator.privilege === 'owner' && privilege === 'admin' &&
                    <Button variant="primary" onClick={ () => { makeOwner(currentAcount._id, account._id ) } }>Make owner</Button>
                  }
                </RightStyled>
              </Wrapper>
            </List.Item>
          )
        )
      }
    </List>
  )
}

export default CollaboratorList
