import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { Container } from 'ui/elements'

import _PresetForm from './form'

const PresetForm = reduxForm({
  form: 'project',
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

export default connect(
  state => ({
    preset: {
      contentType: 'image/jpeg',
      quality: 90
    }
  }),
  null
)(PresetJpeg)
