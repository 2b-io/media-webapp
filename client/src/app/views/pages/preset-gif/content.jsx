import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'

import _PresetForm from './form'

const PresetForm = reduxForm({
  form: 'presetGif',
  enableReinitialize: true
})(_PresetForm)

const PresetGif = ({
  preset,
  identifier,
  updatePreset
}) => {
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
      preset: selectors.findPreset(state, identifier, 'image/gif'),
      identifier
    }
  },
  mapDispatch({
    updatePreset: actions.updatePreset
  })
)(PresetGif)
