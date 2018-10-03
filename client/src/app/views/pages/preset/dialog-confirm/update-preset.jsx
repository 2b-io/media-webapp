import React from 'react'

import { Button, Container, Dialog } from 'ui/elements'
import { Emphasize, Text } from 'ui/typo'

const DialogUpdatePreset = ({
  contentType,
  onConfirm,
  isUpdatePresetDialogActive,
  onCancel
}) => (
  <Dialog
    isActive={ isUpdatePresetDialogActive }
    onOverlayClick={ onCancel }
    content={ ({ params }) => (
      <Container>
        <Text mostLeft mostRight>
          You are about to update configuration for content type <Emphasize>&quot;{ contentType }&quot;</Emphasize>.
          All previous optimized media of this content type will be deleted.
          This operation should take a while to finish.
        </Text>
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
            Update
          </Button>
        </Button.Group>
      </Container>
    ) }
  />
)

export default DialogUpdatePreset
