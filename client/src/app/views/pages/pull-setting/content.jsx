import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { Container } from 'ui/elements'
import { stateful } from 'views/common/decorators'

import _PullSettingForm from './form'

const pullData = {
  pullURL: 'https://www.ntq-solution.com.vn',
  allowedOrigins: [
    '*.ntq-solution.com.vn',
    'img.ntq-solution.com.vn'
  ],
  headers: [
    { name: 'X-Pull', value: 'MediaCDN' },
    { name: 'Authorization', value: 'Bearer slakjdlkasjdkljsad' }
  ]
}

const PullSettingForm = reduxForm({
  form: 'pullSetting',
  enableReinitialize: true
})(_PullSettingForm)

const PullSetting = ({ pullData }) => {

  return (
    <Container>
      <PullSettingForm
        onSubmit={ () => true }
        initialValues={ pullData }
      />
    </Container>
  )
}

export default stateful({
  component: 'PullSetting'
})(
  connect(
    () => ({
      pullData: pullData,
    }),
    null
  )(PullSetting)
)
