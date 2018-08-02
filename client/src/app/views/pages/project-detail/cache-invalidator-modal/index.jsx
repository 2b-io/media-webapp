import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { Container } from 'ui/elements'
import { modal } from 'views/common/decorators'

import _CacheInvalidatorForm from './form'

const CacheInvalidatorForm = reduxForm({
  form: 'cacheinvalidator',
  enableReinitialize: true
})(_CacheInvalidatorForm)

const CacheInvalidatorModal = () => {
  return (
    <Container>
      <CacheInvalidatorForm />
    </Container>
  )
}

export default modal({
  name: 'CacheInvalidatorModal'
})(
  connect(
    null,
  )(CacheInvalidatorModal)
)
