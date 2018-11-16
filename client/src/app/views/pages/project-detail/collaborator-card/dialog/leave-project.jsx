import React from 'react'

import { Break, ButtonGroup, Container, Dialog, TextButton } from 'ui/elements'
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
        <ButtonGroup
          primary={ () => (
            <TextButton
              variant="primary"
              onClick={ () => onConfirm(params) }
            >
              Leave the Project
            </TextButton>
          ) }
          secondary={ () => (
            <TextButton
              variant="secondary"
              mostRight
              onClick={ onCancel }
            >
              Stay
            </TextButton>
          ) }
        />
      </Container>
    ) }
  />
)

export default DialogLeaveProject
