import React from 'react'

import { Button, Container, Dialog } from 'ui/elements'
import { Text } from 'ui/typo'

const DialogMakeOwner = ({
  onConfirm,
  isMakeOwnerDialogActive,
  onCancel
}) => (
  <Dialog
    isActive={ isMakeOwnerDialogActive }
    onOverlayClick={ onCancel }
    content={ ({ params }) => (
      <Container>
        <Text mostLeft mostRight>
          Make Owner?
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
            onClick={ () => onConfirm(params) }
          >
            Make Owner
          </Button>
        </Button.Group>
      </Container>
    ) }
  />
)

export default DialogMakeOwner
