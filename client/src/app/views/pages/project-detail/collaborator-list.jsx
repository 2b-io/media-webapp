import React from 'react'
import styled from 'styled-components'

import { List } from 'ui/compounds'
import { Button, Link } from 'ui/elements'
import { OwnerSetIcon, OwnerRemoveIcon } from 'ui/icons'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const AccountStyled = styled.div`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const PrivilegeValue = styled.span`
  padding-left: ${
    ({ theme }) => theme.spacing.small
  };
`

const CollaboratorList = ({
  collaborators,
  currentAccount,
  makeOwner,
  showDeleteCollaboratorDialog,
  toProfile
}) => {
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
                { privilege === 'owner' &&
                  <PrivilegeValue>{privilege}</PrivilegeValue>
                }
                { signedInCollaborator && signedInCollaborator.privilege === 'owner' && privilege === 'admin' &&
                  <Button.Group loosed>
                    <Button plain onClick={ () => makeOwner(account._id) }>
                      <OwnerSetIcon size="medium" />
                    </Button>
                    <Button plain onClick={ () => showDeleteCollaboratorDialog(account._id, account.email) }>
                      <OwnerRemoveIcon size="medium" />
                    </Button>
                  </Button.Group>
                }
              </Wrapper>
            </List.Item>
          )
        )
      }
    </List>
  )
}

export default CollaboratorList
