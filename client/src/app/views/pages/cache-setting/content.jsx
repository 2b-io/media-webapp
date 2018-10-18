import React from 'react'
import { reduxForm } from 'redux-form'

import { Container } from 'ui/elements'

import _CacheSettingForm from './form'

const CacheSettingForm = reduxForm({
  form: 'cacheSettingForm',
  enableReinitialize: true
})(_CacheSettingForm)

const CacheSetting = ({
  ui: {
    idle
  }
}) => {
  return (
    <Container>
      <CacheSettingForm
        idle={ idle }
        onSubmit={ () => true }
      />
    </Container>
  )
}
export default CacheSetting
