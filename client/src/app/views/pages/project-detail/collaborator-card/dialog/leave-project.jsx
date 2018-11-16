import React from 'react'

import { Break, Button, Container, Dialog, TextButton } from 'ui/elements'
import { Emphasize, Text } from 'ui/typo'

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
          You are about to leave project <Emphasize>&quot;{ params.project.name }&quot;</Emphasize>. You will lose access to it.
        </Text>
        <Break double />
        <Button.Group align="right">
          <TextButton
            variant="secondary"
            mostRight
            onClick={ onCancel }
          >
            Stay
          </TextButton>
          <TextButton
            variant="primary"
            onClick={ () => onConfirm(params) }
          >
            Leave the Project
          </TextButton>
        </Button.Group>
      </Container>
    ) }
  />
)

export default DialogLeaveProject
