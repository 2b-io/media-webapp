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
  preset
}) => {
  return (
    <Container>
      <PresetForm
        initialValues={ preset }
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
        preset: selectors.getPreset(state, identifier, { contentType: 'image/jpeg' } ),
        identifier
      }),
      mapDispatch({
        updatePreset: actions.updatePreset
      })
    )(PresetJpeg)
  )
)
