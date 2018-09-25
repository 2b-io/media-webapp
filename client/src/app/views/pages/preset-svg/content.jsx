import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'
import { stateful } from 'views/common/decorators'

import _PresetForm from './form'

const PresetForm = reduxForm({
  form: 'presetSvg',
  enableReinitialize: true
})(_PresetForm)

const PresetSvg = ({
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

export default stateful({
  component: 'PresetSvg'
})(
  connect(
    (state) => {
      const { identifier } = selectors.currentParams(state)

      return {
        preset: selectors.findPreset(state, identifier, 'image/svg'),
        identifier
      }
    },
    mapDispatch({
      updatePreset: actions.updatePreset
    })
  )(PresetSvg)
)
