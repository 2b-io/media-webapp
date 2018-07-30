import React from 'react'
import styled from 'styled-components'

import { List } from 'ui/compounds'
import { Button, Link } from 'ui/elements'

const Wrapper = styled.div`
  display: flex;
`

const AccountStyled = styled.div`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const PrivilegeStyled = styled.div`
  flex-grow: 0;
`

const PrivilegeValue = styled.span`
  padding: ${
    ({ theme }) => `0 ${ theme.spacing.small }`
  };
`

const CollaboratorList = ({ collaborators, toProfile, currentAccount, makeOwner }) => {
  const signedInCollaborator = Object.values(collaborators).find(
    ({ account }) => currentAccount && account._id === currentAccount._id
  )

  return (
    <List>
      {
        Object.values(collaborators).map(
          ({ _id, account, privilege }) => (
            <List.Item key={ _id }>
              <Wrapper>
                <AccountStyled>
                  <Link href="#" onClick={ () => toProfile(account._id) } >
                    <span>{ account.email }</span>
                  </Link>
                </AccountStyled>
                <PrivilegeStyled>
                  { privilege === 'owner' &&
                    <PrivilegeValue>{privilege}</PrivilegeValue>
                  }
                  { signedInCollaborator && signedInCollaborator.privilege === 'owner' && privilege === 'admin' &&
                    <Button variant="primary" onClick={ () => { makeOwner(account._id) } }>Make owner</Button>
                  }
                </PrivilegeStyled>
              </Wrapper>
            </List.Item>
          )
        )
      }
    </List>
  )
}

export default CollaboratorList
