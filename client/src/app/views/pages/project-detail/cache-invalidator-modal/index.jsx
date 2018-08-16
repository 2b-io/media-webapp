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
  invalidCache,
  slug,
  invalidAllCache,
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
        <ErrorBox>An error happens when invalid cache.</ErrorBox>
      }
      <CacheInvalidatorForm
        idle={ idle }
        onSubmit={ ({ patterns }) => invalidCache(patterns, slug) }
        invalidAll={ invalidAllCache }
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
