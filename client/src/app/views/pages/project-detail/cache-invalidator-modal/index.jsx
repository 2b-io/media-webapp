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
  slug,
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
        <Redirect to={ `/projects/${ slug }` } />
      }
      { error &&
        <ErrorBox>An error happens when invalidate cache.</ErrorBox>
      }
      <CacheInvalidatorForm
        idle={ idle }
        onSubmit={ ({ patterns }) => invalidateCache(patterns, slug) }
        invalidateAllCache={ () => invalidateAllCache(slug) }
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
      invalidateAllCache: slug => actions.invalidateAllCache(slug)
    })
  )(CacheInvalidatorModal)
)
