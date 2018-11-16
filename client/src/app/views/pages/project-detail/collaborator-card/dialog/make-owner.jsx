import React from 'react'

import { Break, Button, Container, Dialog, TextButton } from 'ui/elements'
import { Emphasize, Text } from 'ui/typo'

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
          You are about to make <Emphasize>{ params.account.name }</Emphasize> as the owner of project <Emphasize>&quot;{ params.project.name }&quot;</Emphasize>. This operation cannot be undone.
        </Text>
        <Break double />
        <Button.Group align="right">
          <TextButton
            variant="secondary"
            mostRight
            onClick={ onCancel }
          >
            Cancel
          </TextButton>
          <TextButton
            variant="primary"
            onClick={ () => onConfirm(params) }
          >
            Change ownership
          </TextButton>
        </Button.Group>
      </Container>
    ) }
  />
)

export default DialogMakeOwner
