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

const CacheInvalidatorModal = ({ invalidCache, slug }) => {
  return (
    <Container>
      <CacheInvalidatorForm
        idle={ true }
        onSubmit={ ( patterns ) => invalidCache(patterns, slug) }
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
      invalidCache: (patterns, slug) => actions.invalidCache(patterns, slug),
    })
  )(CacheInvalidatorModal)
)
