import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container, LoadingIcon } from 'ui/elements'

import _CacheSettingForm from './form'

const CacheSettingForm = reduxForm({
  form: 'cacheSettingForm',
  enableReinitialize: true
})(_CacheSettingForm)

const CacheSetting = ({
  cacheSetting,
  identifier,
  updateCacheSetting,
  ui: {
    idle
  }
}) => {
  return (
    <Container>
      {
        !idle && <LoadingIcon />
      }
      <CacheSettingForm
        idle={ idle }
        initialValues={ cacheSetting }
        onSubmit={ (cacheSetting) => updateCacheSetting({ identifier, cacheSetting }) }
      />
    </Container>
  )
}

export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)

    if (!identifier) {
      return {}
    }

    return {
      cacheSetting: selectors.cacheSetting(state, identifier),
      identifier
    }
  },
  mapDispatch({
    updateCacheSetting: actions.updateCacheSetting
  })
)(CacheSetting)
