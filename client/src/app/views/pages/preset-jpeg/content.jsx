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
  form: 'presetJpeg',
  enableReinitialize: true
})(_PresetForm)

const PresetJpeg = ({
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
        initialValues={ { ...parameters, contentType } }
        onSubmit={ ({ ...parameters }) => {
          const { contentType, ...params } = parameters
          updatePreset({
            preset: {
              contentType: parameters.contentType,
              parameters: params
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
    component: 'PresetJpeg'
  })(
    connect(
      (state, { params: { identifier } }) => ({
        preset: selectors.findPreset(state, identifier, 'image/jpeg'),
        identifier
      }),
      mapDispatch({
        updatePreset: actions.updatePreset
      })
    )(PresetJpeg)
  )
)
