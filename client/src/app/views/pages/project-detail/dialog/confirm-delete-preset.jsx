import React from 'react'
import { connect } from 'react-redux'

import { dialog } from 'views/common/decorators'
import { Dialog } from 'ui/compounds'

const ConfirmDeletePresetDialog = ({
  content,
  choices,
  dialogParams
}) => {

  return (
    <Dialog>
      <Dialog.Content>{ content(dialogParams) }</Dialog.Content>
      <Dialog.Choices>{ choices(dialogParams) }</Dialog.Choices>
    </Dialog>
  )
}

export default dialog({
  name: 'ConfirmDeletePresetDialog'
})(
  connect(
    null
  )(ConfirmDeletePresetDialog)
)
