import React from 'react'

import { Break, Button, Container, Dialog } from 'ui/elements'
import { Text } from 'ui/typo'

const DialogLeaveProject = ({
  onConfirm,
  isLeaveProjectDialogActive,
  onCancel
}) => (
  <Dialog
    isActive={ isLeaveProjectDialogActive }
    onOverlayClick={ onCancel }
    content={ ({ params }) => (
      <Container>
        <Text mostLeft mostRight>
          Leave project?
        </Text>
        <Break double />
        <Button.Group align="right">
          <Button
            variant="secondary"
            mostRight
            onClick={ onCancel }
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={ () => onConfirm(params) }
          >
            Remove
          </Button>
        </Button.Group>
      </Container>
    ) }
  />
)

export default DialogLeaveProject
