import React from 'react'

import { Button, Container, Dialog } from 'ui/elements'
import { Text } from 'ui/typo'

const DialogLeaveProject = ({
  onConfirm,
  isLeaveProjectDialogActive,
  onCancel
}) => (
  <Dialog
    isActive={ isLeaveProjectDialogActive }
    onOverlayClick={ onCancel }
    content={ () => (
      <Container>
        <Text mostLeft mostRight>
          Leave project?
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

export default DialogLeaveProject
