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

const CreatePreset = ({ createPreset }) => {
  return (
    <Container center>
      <PresetForm onSubmit={ createPreset } />
    </Container>
  )
}

export default modal({
  name: 'CreatePreset'
})(
  connect(
    null,
    mapDispatch({
      createPreset: actions.createPreset
    })
  )(CreatePreset)
)
