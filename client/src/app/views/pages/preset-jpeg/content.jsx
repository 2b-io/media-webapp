import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { Container } from 'ui/elements'

import _PresetForm from './form'

const PresetForm = reduxForm({
  form: 'project',
  enableReinitialize: true
})(_PresetForm)

const JpegPreset = ({
  range
}) => {
  return (
    <Container>
      <PresetForm
        initialValues={ { range: range || 0 } }
      />
    </Container>
  )
}

export default connect(
  null
)(JpegPreset)
