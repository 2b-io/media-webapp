import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'

import _CacheSettingForm from './form'

const CacheSettingForm = reduxForm({
  form: 'cacheSettingForm',
  enableReinitialize: true
})(_CacheSettingForm)

const CacheSetting = ({
  expired,
  identifier,
  updateCacheSetting,
  ui: {
    idle
  }
}) => {
  return (
    <Container>
      <CacheSettingForm
        idle={ idle }
        initialValues={ expired }
        onSubmit={ ({ expired }) => updateCacheSetting({ identifier, expired }) }
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
      expired: selectors.cacheSetting(state, identifier),
      identifier
    }
  },
  mapDispatch({
    updateCacheSetting: actions.updateCacheSetting
  })
)(CacheSetting)
