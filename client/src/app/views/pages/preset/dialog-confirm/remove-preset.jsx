import React from 'react'

import { Break, Container, Dialog, Button } from 'ui/elements'
import { Emphasize, Text } from 'ui/typo'

const DialogRemovePreset = ({
  contentType,
  isActive,
  onCancel,
  onConfirm
}) => (
  <Dialog
    isActive={ isActive }
    onOverlayClick={ onCancel }
    content={ () => (
      <Container>
        <Text mostLeft mostRight>
          You are about to permanently delete configuration for content type <Emphasize>&quot;{ contentType }&quot;</Emphasize>.
          All optimized media of this content type will be deleted along with this configuration.
          This operation cannot be undone and it should take a while to finish.
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
            onClick={ onConfirm }
          >
            Delete
          </Button>
        </Button.Group>
      </Container>
    ) }
  />
)

export default DialogRemovePreset
