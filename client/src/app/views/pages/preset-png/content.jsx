import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'

import _PresetForm from './form'

const PresetForm = reduxForm({
  form: 'presetPng',
  enableReinitialize: true
})(_PresetForm)

const PresetPng = ({
  preset,
  identifier,
  updatePreset
}) => {
  if (!preset) {
    return null
  }
  const { contentType, isActive, parameters } = preset

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
            identifier
          })
        } }
      />
    </Container>
  )
}

export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)

    return {
      preset: selectors.findPreset(state, identifier, 'image/png'),
      identifier
    }
  },
  mapDispatch({
    updatePreset: actions.updatePreset
  })
)(PresetPng)
