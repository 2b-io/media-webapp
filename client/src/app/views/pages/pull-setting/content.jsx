import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { Container } from 'ui/elements'
import { stateful } from 'views/common/decorators'

import _PullSettingForm from './form'

const PullSettingForm = reduxForm({
  form: 'pullSetting',
  enableReinitialize: true
})(_PullSettingForm)

const PullSetting = () => {

  return (
    <Container>
      <PullSettingForm
        onSubmit={ () => true }
      />
    </Container>
  )
}

export default stateful({
  component: 'PullSetting'
})(
  connect(
    null
  )(PullSetting)
)
