import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { actions } from 'state/interface'
import { Container } from 'ui/elements'
import { modal } from 'views/common/decorators'
import { mapDispatch } from 'services/redux-helpers'

import _CacheInvalidatorForm from './form'

const CacheInvalidatorForm = reduxForm({
  form: 'cacheinvalidator',
  enableReinitialize: true
})(_CacheInvalidatorForm)

const CacheInvalidatorModal = ({
  closeCacheInvalidatorForm,
  invalidCache,
  slug,
  ui: {
    idle,
    invalidCacheResult
  }
}) => {

  return (
    <Container>
      <CacheInvalidatorForm
        idle={ idle }
        invalidCacheResult={ invalidCacheResult }
        onSubmit={
          ({ patterns }) => {
            invalidCache(patterns, slug)
            closeCacheInvalidatorForm()
          }
        }
      />
    </Container>
  )
}

export default modal({
  name: 'CacheInvalidatorModal'
})(
  connect(
    null,
    mapDispatch({
      invalidCache: actions.invalidCache
    })
  )(CacheInvalidatorModal)
)
