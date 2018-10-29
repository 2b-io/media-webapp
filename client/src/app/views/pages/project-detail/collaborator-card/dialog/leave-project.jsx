import React from 'react'

import { Break, Button, Container, Dialog } from 'ui/elements'
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
          <Button
            variant="secondary"
            mostRight
            onClick={ onCancel }
          >
            Stay
          </Button>
          <Button
            variant="primary"
            onClick={ () => onConfirm(params) }
          >
            Leave the Project
          </Button>
        </Button.Group>
      </Container>
    ) }
  />
)

export default DialogLeaveProject
