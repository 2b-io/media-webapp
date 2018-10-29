import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container } from 'ui/elements'

import _CacheInvalidForm from './form'

const CacheInvalidForm = reduxForm({
  form: 'cacheinvalidator',
  enableReinitialize: true
})(_CacheInvalidForm)

const CacheInvalidate = ({
  invalidateCache,
  identifier,
  ui: {
    idle
  }
}) => {
  return (
    <Container>
      <CacheInvalidForm
        idle={ idle }
        onSubmit={ ({ patterns }) => invalidateCache(patterns, identifier) }
      />
    </Container>
  )
}
export default connect(
  (state) => {
    const { identifier } = selectors.currentParams(state)

    return {
      identifier
    }
  },
  mapDispatch({
    invalidateCache: actions.invalidateCache
  })
)(CacheInvalidate)
