import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Container, ErrorBox, Link } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { stateful } from 'views/common/decorators'
import { Redirect } from 'views/router'

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

const PullSetting = (pullData) => {

  return (
    <Container>
      <PullSettingForm
        onSubmit={ () => {console.log(1); return true}}
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
