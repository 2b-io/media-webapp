import React from 'react'

import { Link } from 'ui/elements'

const CollaboratorList = ({ collaborators, toProfile }) => (
  <ul>
    {
      collaborators.map(
        collaborator => (
          <li key={ collaborator._id }>
            <Link href="#"
              onClick={ () => toProfile(collaborator.account._id) }
            >
              <span>{ collaborator.account.email }</span>
            </Link>
            <span> - </span>
            <span>{ collaborator.privilege }</span>
          </li>
        )
      )
    }
  </ul>
)

export default CollaboratorList
