import React from 'react'

import { List } from 'ui/compounds'
import { Link } from 'ui/elements'

const CollaboratorList = ({ collaborators, toProfile }) => (
  <List>
    {
      Object.values(collaborators).map(
        collaborator => (
          <List.Item key={ collaborator._id }>
            <Link href="#"
              onClick={ () => toProfile(collaborator.account._id) }
            >
              <span>{ collaborator.account.email }</span>
            </Link>
            <span> - </span>
            <span>{ collaborator.privilege }</span>
          </List.Item>
        )
      )
    }
  </List>
)

export default CollaboratorList
