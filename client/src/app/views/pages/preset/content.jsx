import React from 'react'
import { reduxForm } from 'redux-form'
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

const PresetJpeg = ({
  preset,
  identifier,
  updatePreset,
  removePreset,
  showRemovePresetDialog,
  showUpdatePresetDialog,
  hideRemovePresetDialog,
  hideUpdatePresetDialog,
  ui: {
    idle,
    isUpdatePresetDialogActive,
    isRemovePresetDialogActive,
  }
}) => {
  if (!preset) {
    return null
  }

  const { contentType, parameters, isActive } = preset

  return (
    <Container>
      <PresetForm
        contentType={ contentType }
        idle={ idle }
        initialValues={ { contentType, isActive, ...parameters } }
        onSubmit={ ({ contentType, isActive, ...parameters }) => {
          showUpdatePresetDialog({
            preset: {
              contentType,
              isActive,
              parameters
            },
            identifier
          })
        } }
        isActive={ isActive }
      />
      <TextButton
        onClick={ showRemovePresetDialog }
        disabled={ !idle }
      >
        Permanently delete
      </TextButton>
      <DialogRemovePreset
        contentType={ contentType }
        idle={ idle }
        isActive={ isRemovePresetDialogActive }
        onConfirm={ () => removePreset({ identifier, contentType }) }
        onCancel={ hideRemovePresetDialog }
      />
      <DialogUpdatePreset
        contentType={ contentType }
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
      preset: selectors.findPreset(state, identifier, contentType.replace('_', '/')),
      identifier
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
