import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'
import DialogRemovePreset from 'views/common/dialog-confirm/dialog-remove-preset'
import DialogUpdatePreset from 'views/common/dialog-confirm/dialog-update-preset'
import { Redirect } from 'views/router'

import _PresetForm from './form'

const REMOVE_PRESET = 'REMOVE_PRESET'
const UPDATE_PRESET = 'UPDATE_PRESET'

const PresetForm = reduxForm({
  form: 'presetJpeg',
  enableReinitialize: true
})(_PresetForm)

const PresetJpeg = ({
  preset,
  identifier,
  updatePreset,
  removePreset,
  showRemovePresetDialog,
  showUpdatePresetDialog,
  hideRemovePresetDialog,
  hideUpdatePresetDialog,
  isRemovePresetDialogActive,
  isUpdatePresetDialogActive,
  dialogParams,
  ui: {
    removePresetError,
    removePresetResult,
    notFoundPreset,
    updatePresetResult,
    updatePresetError
  }
}) => {

  if (removePresetResult || notFoundPreset ) {
    return <Redirect to={ `/projects/${ identifier }` } />
  }

  if (!preset) {
    return null
  }
  console.log('dialogParams', dialogParams);
  const { contentType, parameters, isActive } = preset

  return (
    <Container>
      <PresetForm
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
          // updatePreset({
          //   preset: {
          //     contentType,
          //     isActive,
          //     parameters
          //   },
          //   identifier
          // })
        } }
        isActive={ isActive }
        showRemovePresetDialog={ showRemovePresetDialog }
      />
      <DialogRemovePreset
        isRemovePresetDialogActive={ isRemovePresetDialogActive }
        removePreset={ () => removePreset({ identifier, contentType }) }
        hideRemovePresetDialog={ hideRemovePresetDialog }
        removePresetError={ removePresetError }
        message={ <p>
          You are about to permanently delete configuration for content type <b> &quot;image/jpeg</b> &quot;.
          All optimized media of this content type will be deleted along with this configuration.
          This operation cannot be undone and it should take a while to finish.
        </p> }
      />
      <DialogUpdatePreset
        isUpdatePresetDialogActive={ isUpdatePresetDialogActive }
        updatePreset={ () => updatePreset({ identifier, contentType }) }
        hideUpdatePresetDialog={ hideUpdatePresetDialog }
        updatePresetError={ updatePresetError }
        message={ <p>
          You are about to update configuration for content type <b> &quot;image/jpeg</b> &quot;.
          All previous optimized media of this content type will be deleted.
          This operation should take a while to finish.
        </p> }
      />
    </Container>
  )
}

export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)

    return {
      preset: selectors.findPreset(state, identifier, 'image/jpeg'),
      identifier
    }
  },
  mapDispatch({
    updatePreset: actions.updatePreset
  })
)(PresetJpeg)
