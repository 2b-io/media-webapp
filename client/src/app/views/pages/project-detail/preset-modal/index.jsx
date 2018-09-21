import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container, ErrorBox } from 'ui/elements'
import { modal } from 'views/common/decorators'
import { Redirect, withParams } from 'views/router'

import _PresetForm from './form'

const PresetForm = reduxForm({
  form: 'preset',
  enableReinitialize: true
})(_PresetForm)

const PresetModal = ({
  createPreset,
  identifier,
  ui: {
    idle,
    createError,
    createResult
  }
}) => {
  return (
    <Container>
      { createError &&
        <ErrorBox>An error happens when creating the new preset.</ErrorBox>
      }
      { createResult &&
        <Redirect to={ `/projects/${ identifier }/presets/${ createResult.contentType }` } />
      }
      <PresetForm
        idle={ idle }
        onSubmit={ createPreset }
      />
    </Container>
  )
}

export default withParams(
  modal({
    name: 'Preset'
  })(
  // withParams(
    connect(
      (state, { params: { identifier, contentType } }) => {
        return {
          preset: selectors.findPreset(state, { identifier, contentType }) || {},
          identifier
        }
      },
      mapDispatch({
        createPreset: actions.createPreset
      })
    )(PresetModal)
  )
)
