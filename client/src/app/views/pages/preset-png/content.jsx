import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'
import { stateful } from 'views/common/decorators'
import { withParams } from 'views/router'

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
  const { contentType, parameters } = preset

  return (
    <Container>
      <PresetForm
        initialValues={ { contentType, ...parameters } }
        onSubmit={ ({ contentType, ...parameters }) => {
          updatePreset({
            preset: {
              contentType,
              parameters
            },
            identifier
          })
        } }
      />
    </Container>
  )
}

export default withParams(
  stateful({
    component: 'PresetPng'
  })(
    connect(
      (state, { params: { identifier } }) => ({
        preset: selectors.findPreset(state, identifier, 'image/png'),
        identifier
      }),
      mapDispatch({
        updatePreset: actions.updatePreset
      })
    )(PresetPng)
  )
)
