import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container } from 'ui/elements'
import { modal } from 'views/common/decorators'

import _PresetForm from './form'

const PresetForm = reduxForm({
  form: 'preset',
  enableReinitialize: true
})(_PresetForm)

const UpdatePreset = ({ updatePreset, modal: { params } }) => {
  return (
    <Container center>
      <PresetForm onSubmit={ updatePreset } initialValues={ params.preset } />
    </Container>
  )
}

export default modal({
  name: 'UpdatePreset',
  onEnter: (dispatch, { params }) => params,
  onExit: () => (null)
})(
  connect(
    // (state, { modal }) => {
    //   return {
    //     preset: {
    //
    //     }
    //   }
    // },
    null,
    mapDispatch({
      updatePreset: actions.updatePreset
    })
  )(UpdatePreset)
)
