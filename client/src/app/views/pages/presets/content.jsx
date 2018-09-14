import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { Container } from 'ui/elements'
import { stateful } from 'views/common/decorators'
import { mapDispatch } from 'services/redux-helpers'
import { selectors, actions } from 'state/interface'
import { withParams } from 'views/router'

import _PresetForm from './form'

const PresetForm = reduxForm({
  form: 'project',
  enableReinitialize: true
})(_PresetForm)

const Preset = () => {
  return (
    <Container>
      <PresetForm
      />
    </Container>
  )
}

export default connect(
  null
)(Preset)
