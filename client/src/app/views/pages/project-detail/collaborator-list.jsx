import React from 'react'
import styled from 'styled-components'

import { List } from 'ui/compounds'
import { Button, Link } from 'ui/elements'

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
`

const CollaboratorList = ({ collaborators, toProfile, session }) => (
  <List>
    {
      Object.values(collaborators).map(
        ({ _id, account, privilege }) => (
          <List.Item key={ _id }>
            <Item>
              <Link href="#"
                onClick={ () => toProfile(account._id) }
              >
                <span>{ account.email }</span>
              </Link>
              {
                ( account._id===session.account._id ) ? <span>{ privilege }</span> : (
                  ( privilege!== 'owner' ) && <Button plain type="submit">Make owner</Button>
                )
                //Dang sai logic
              }
            </Item>
          </List.Item>
        )
      )
    }
  </List>
)

export default CollaboratorList
