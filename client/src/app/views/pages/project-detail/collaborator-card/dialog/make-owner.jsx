import React from 'react'

import { Break, Button, Container, Dialog } from 'ui/elements'
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
            Change ownership
          </Button>
        </Button.Group>
      </Container>
    ) }
  />
)

export default DialogMakeOwner
