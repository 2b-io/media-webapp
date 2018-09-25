import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { actions } from 'state/interface'
import { Container, ErrorBox } from 'ui/elements'
import { modal } from 'views/common/decorators'
import { mapDispatch } from 'services/redux-helpers'
import { Redirect } from 'views/router'

import _CacheInvalidatorForm from './form'

const CacheInvalidatorForm = reduxForm({
  form: 'cacheinvalidator',
  enableReinitialize: true
})(_CacheInvalidatorForm)

const CacheInvalidatorModal = ({
  invalidateCache,
  identifier,
  invalidateAllCache,
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
      <CacheInvalidatorForm
        idle={ idle }
        onSubmit={ ({ patterns }) => invalidateCache(patterns, identifier) }
        invalidateAllCache={ () => invalidateAllCache(identifier) }
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
      invalidateCache: actions.invalidateCache,
      invalidateAllCache: identifier => actions.invalidateAllCache(identifier)
    })
  )(CacheInvalidatorModal)
)
