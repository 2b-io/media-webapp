import React from 'react'
import { connect } from 'react-redux'

import { dialog } from 'views/common/decorators'
import { Dialog } from 'ui/compounds'

const ConfirmDeleteCollaboratorDialog = ({
  content,
  choices,
  dialogParams
}) => {

  return (
    <Dialog>
      <Dialog.Content>{ content() }</Dialog.Content>
      <Dialog.Choices>{ choices(dialogParams) }</Dialog.Choices>
    </Dialog>
  )
}

export default dialog({
  name: 'ConfirmDeleteCollaboratorDialog'
})(
  connect(
    null
  )(ConfirmDeleteCollaboratorDialog)
)
