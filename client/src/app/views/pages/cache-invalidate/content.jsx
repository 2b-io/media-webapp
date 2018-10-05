import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container, ErrorBox } from 'ui/elements'
import { Redirect } from 'views/router'

import _CacheInvalidForm from './form'

const CacheInvalidForm = reduxForm({
  form: 'cacheinvalidator',
  enableReinitialize: true
})(_CacheInvalidForm)

const CacheInvalidate = ({
  invalidateCache,
  identifier,
  ui: {
    error,
    idle,
    result
  }
}) => {
  return (
    <Container>
      { result &&
        <Redirect to={ `/projects/${ identifier }` } />
      }
      { error &&
        <ErrorBox>An error happens when invalidate cache.</ErrorBox>
      }
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
