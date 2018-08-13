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

const PrivilegeStyled = styled.div`
  flex-grow: 0;
`

const PrivilegeValue = styled.span`
  padding: ${
    ({ theme }) => `0 ${ theme.spacing.small }`
  };
`

const PrivilegeValueButton = styled.div`
  display: flex;
  align-items: center;
`

const CollaboratorList = ({
  collaborators,
  currentAccount,
  makeOwner,
  deleteCollaborator,
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
                <PrivilegeStyled>
                  { privilege === 'owner' &&
                    <PrivilegeValue>{privilege}</PrivilegeValue>
                  }
                  { signedInCollaborator && signedInCollaborator.privilege === 'owner' && privilege === 'admin' &&
                    <PrivilegeValueButton>
                      <Button variant="primary" onClick={ () => { makeOwner(account._id) } }>
                        <OwnerSetIcon size="small" />
                      </Button>
                      <Button variant="primary" onClick={ () => { deleteCollaborator(account._id) } }>
                        <OwnerRemoveIcon size="small" />
                      </Button>
                    </PrivilegeValueButton>
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
