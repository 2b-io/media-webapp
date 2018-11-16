import React from 'react'

import { Button, Container, Dialog, TextButton } from 'ui/elements'
import { Emphasize, Text } from 'ui/typo'

const DialogUpdatePreset = ({
  contentType,
  idle,
  isUpdatePresetDialogActive,
  onCancel,
  onConfirm
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
          <TextButton
            disabled={ !idle }
            variant="secondary"
            mostRight
            onClick={ onCancel }
          >
            Cancel
          </TextButton>
          <TextButton
            disabled={ !idle }
            variant="primary"
            onClick={ () => onConfirm(params) }
          >
            Update
          </TextButton>
        </Button.Group>
      </Container>
    ) }
  />
)

export default DialogUpdatePreset
