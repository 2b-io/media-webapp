import React from 'react'

const CollaboratorList = ({ collaborators }) => (
  <ul>
    {
      collaborators.map(
        collaborator => (
          <li key={ collaborator._id }>{ collaborator.account.email } - { collaborator.privilege }</li>
        )
      )
    }
  </ul>
)

export default CollaboratorList
