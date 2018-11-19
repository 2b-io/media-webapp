import React from 'react'

import { Break, ButtonGroup, Container, Dialog, TextButton } from 'ui/elements'
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
        <ButtonGroup
          primary={ () => (
            <TextButton
              variant="primary"
              onClick={ () => onConfirm(params) }
            >
              Change ownership
            </TextButton>
          ) }
          secondary={ () => (
            <TextButton
              variant="secondary"
              mostRight
              onClick={ onCancel }
            >
              Cancel
            </TextButton>
          ) }
        />
      </Container>
    ) }
  />
)

export default DialogMakeOwner
