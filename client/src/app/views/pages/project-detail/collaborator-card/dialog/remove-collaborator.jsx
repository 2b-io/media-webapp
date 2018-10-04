import React from 'react'

import { Button, Container, Dialog } from 'ui/elements'
import { Text } from 'ui/typo'

const DialogRemoveCollaborator = ({
  onConfirm,
  isRemoveCollaboratorActive,
  onCancel
}) => (
  <Dialog
    isActive={ isRemoveCollaboratorActive }
    onOverlayClick={ onCancel }
    content={ ({ params }) => (
      <Container>
        <Text mostLeft mostRight>
          Remove the collaborator?
        </Text>
        <Button.Group mostRight>
          <Button
            variant="secondary"
            mostRight
            onClick={ onCancel }
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={ onConfirm }
          >
            Remove
          </Button>
        </Button.Group>
      </Container>
    ) }
  />
)

export default DialogRemoveCollaborator
