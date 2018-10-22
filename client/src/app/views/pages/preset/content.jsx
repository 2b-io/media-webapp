import React from 'react'
import { formValueSelector, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container, TextButton } from 'ui/elements'
import DialogRemovePreset from './dialog-confirm/remove-preset'
import DialogUpdatePreset from './dialog-confirm/update-preset'

import StatelessPresetForm from './form'

const PresetForm = reduxForm({
  form: 'PRESET_FORM',
  enableReinitialize: true
})(StatelessPresetForm)

const formSelector = formValueSelector('PRESET_FORM')

const PresetJpeg = ({
  identifier,
  parameters,
  preset,
  updatePreset,
  removePreset,
  showRemovePresetDialog,
  hideRemovePresetDialog,
  showUpdatePresetDialog,
  hideUpdatePresetDialog,
  ui: {
    idle,
    isRemovePresetDialogActive,
    isUpdatePresetDialogActive
  }
}) => {
  if (!preset) {
    return null
  }

  return (
    <Container>
      <PresetForm
        contentType={ preset.contentType }
        idle={ idle }
        initialValues={ preset }
        currentParameters={ parameters }
        onSubmit={ (preset) => {
          showUpdatePresetDialog({
            preset,
            identifier
          })
        } }
      />
      <TextButton
        onClick={ showRemovePresetDialog }
        disabled={ !idle }
      >
        Permanently delete
      </TextButton>
      <DialogRemovePreset
        contentType={ preset.contentType }
        idle={ idle }
        isActive={ isRemovePresetDialogActive }
        onConfirm={ () => removePreset({ identifier, contentType }) }
        onCancel={ hideRemovePresetDialog }
      />
      <DialogUpdatePreset
        contentType={ preset.contentType }
        idle={ idle }
        isUpdatePresetDialogActive={ isUpdatePresetDialogActive }
        onConfirm={ ({ identifier, preset }) => {
          updatePreset({ identifier, preset })
        } }
        onCancel={ hideUpdatePresetDialog }
      />
    </Container>
  )
}

export default connect(
  (state) => {
    const { contentType, identifier } = selectors.currentParams(state)

    if (!contentType || !identifier) {
      return {}
    }

    return {
      identifier,
      parameters: formSelector(state, 'parameters'),
      preset: selectors.findPreset(state, identifier, contentType.replace('_', '/'))
    }
  },
  mapDispatch({
    updatePreset: actions.updatePreset,
    removePreset: actions.removePreset,
    showRemovePresetDialog: () => actions.showDialog('REMOVE_PRESET'),
    hideRemovePresetDialog: () => actions.hideDialog('REMOVE_PRESET'),
    showUpdatePresetDialog: (params) => actions.showDialog('UPDATE_PRESET', params),
    hideUpdatePresetDialog: () => actions.hideDialog('UPDATE_PRESET')
  })
)(PresetJpeg)
