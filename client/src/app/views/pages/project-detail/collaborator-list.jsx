import React from 'react'
import styled from 'styled-components'

import { List } from 'ui/compounds'
import { Button, Link } from 'ui/elements'

const Wrapper = styled.div`
  display: flex;
`

const Left = styled.div`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Right = styled.div`
  flex-grow: 0;
`

const PrivilegeValue = styled.span`
  padding: ${
    ({ theme }) => `0 ${ theme.spacing.small }`
  };
`

const CollaboratorList = ({ collaborators, toProfile, session }) => {
  const signedInCollaborator = Object.values(collaborators).find(
    ({ account }) => account._id === session.account._id
  )

  return (
    <List>
      {
        Object.values(collaborators).map(
          ({ _id, account, privilege }) => {

            return (
              <List.Item key={ _id }>
                <Wrapper>
                  <Left>
                    <Link href="#" onClick={ () => toProfile(account._id) } >
                      <span>{ account.email }</span>
                    </Link>
                  </Left>
                  <Right>
                    { privilege === 'owner' &&
                      <PrivilegeValue>{privilege}</PrivilegeValue>
                    }
                    { signedInCollaborator.privilege === 'owner' && privilege === 'admin' &&
                      <Button variant="primary">Make owner</Button>
                    }
                  </Right>
                </Wrapper>
              </List.Item>
            )
          }
        )
      }
    </List>
  )
}

export default CollaboratorList
