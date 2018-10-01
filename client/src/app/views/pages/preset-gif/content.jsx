import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'
import { stateful } from 'views/common/decorators'
import DialogRemovePreset from 'views/common/dialog-confirm/dialog-remove-preset'
import { Redirect } from 'views/router'

import _PresetForm from './form'

const REMOVE_PRESET = 'REMOVE_PRESET'

const PresetForm = reduxForm({
  form: 'presetGif',
  enableReinitialize: true
})(_PresetForm)

const PresetGif = ({
  preset,
  identifier,
  updatePreset,
  removePreset,
  showRemovePresetDialog,
  hideRemovePresetDialog,
  isRemovePresetDialogActive,
  ui: {
    removePresetError,
    removePresetResult,
    notFoundPreset
  }
}) => {

  if (removePresetResult || notFoundPreset ) {
    return <Redirect to={ `/projects/${ identifier }` } />
  }

  if (!preset) {
    return null
  }
  
  const { contentType, parameters, isActive } = preset

  return (
    <Container>
      <PresetForm
        initialValues={ { contentType, isActive, ...parameters } }
        onSubmit={ ({ contentType, isActive, ...parameters }) => {
          updatePreset({
            preset: {
              contentType,
              isActive,
              parameters
            },
            identifier,
          })
        } }
        isActive={ isActive }
        showRemovePresetDialog={ showRemovePresetDialog }
      />
      <DialogRemovePreset
        isRemovePresetDialogActive={ isRemovePresetDialogActive }
        removePreset={ () => removePreset({ identifier, contentType }) }
        hideRemovePresetDialog={ hideRemovePresetDialog }
        removePresetError={ removePresetError }
        defaultMessage={ <p>
          You are about to permanently delete configuration for content type <b> &quot;image/gif</b> &quot;.
          All optimized media of this content type will be deleted along with this configuration.
          This operation cannot be undone and it should take a while to finish.
        </p> }
      />
    </Container>
  )
}

export default stateful({
  component: 'EditPreset'
})(
  connect(
    (state) => {
      const { identifier } = selectors.currentParams(state)

      return {
        preset: selectors.findPreset(state, identifier, 'image/gif'),
        identifier,
        isRemovePresetDialogActive: selectors.isDialogActive(state, REMOVE_PRESET)
      }
    },
    mapDispatch({
      updatePreset: actions.updatePreset,
      removePreset: actions.removePreset,
      showRemovePresetDialog: () => actions.showDialog(REMOVE_PRESET),
      hideRemovePresetDialog: () => actions.hideDialog(REMOVE_PRESET)
    })
  )(PresetGif)
)
