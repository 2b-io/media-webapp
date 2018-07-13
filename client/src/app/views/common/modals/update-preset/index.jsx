import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container } from 'ui/elements'
import { modal } from 'views/common/decorators'
import { selectors } from 'state/interface'

import _PresetForm from './form'

const PresetForm = reduxForm({
  form: 'preset',
  enableReinitialize: true
})(_PresetForm)

const UpdatePreset = ({ updatePreset, preset, deletePreset, hideUpdatePresetForm }) => {

  return (
    <Container center>
      <PresetForm onSubmit={ updatePreset } initialValues={ preset } deletePreset={ () => deletePreset(preset) } hideUpdatePresetForm={ hideUpdatePresetForm } />
    </Container>
  )
}

export default modal({
  name: 'UpdatePreset',
  // onEnter: (dispatch, { params }) => null,
  // onExit: () => (null)
})(
  connect(
    (state, { modal: { params: { hash, project: { slug } } } }) => ({
      preset: selectors.findPresetByHash(state, slug, hash)
    }),
    mapDispatch({
      updatePreset: actions.updatePreset,
      deletePreset: actions.deletePreset,
      hideUpdatePresetForm: () => ({
        type: '@@MODAL/HIDE',
        payload: { modal: 'UpdatePreset' }
      })
    })
  )(UpdatePreset)
)
