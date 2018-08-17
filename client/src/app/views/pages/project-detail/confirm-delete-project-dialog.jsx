import React from 'react'
import { connect } from 'react-redux'

import { dialog } from 'views/common/decorators'
import { Dialog } from 'ui/compounds'

const ConfirmDeleteProjectDialog = ({ content, choices }) => (
  <Dialog>
    <Dialog.Content>{ content() }</Dialog.Content>
    <Dialog.Choices>{ choices() }</Dialog.Choices>
  </Dialog>
)

export default dialog({
  name: 'ConfirmDeleteProjectDialog'
})(
  connect(
    null
  )(ConfirmDeleteProjectDialog)
)
