import React from 'react'

const CollaboratorList = ({ collaborators }) => (
  <ul>
    {
      collaborators.map(
        collaborator => (
          <li key={ collaborator._id }>{ collaborator.account.email }</li>
        )
      )
    }
  </ul>
)

export default CollaboratorList
