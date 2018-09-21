import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Container, ErrorBox } from 'ui/elements'
import { Text } from 'ui/typo'
import { modal } from 'views/common/decorators'
import { Redirect, withParams } from 'views/router'

import _PresetForm from './form'

const SUPPORTED_CONTENT_TYPES = [
  { label: 'image/jpeg', value: 'image/jpeg' },
  { label: 'image/png', value: 'image/png' },
  { label: 'image/svg', value: 'image/svg' },
  { label: 'image/gif', value: 'image/gif' }
]

const PresetForm = reduxForm({
  form: 'preset',
  enableReinitialize: true
})(_PresetForm)

const PresetModal = ({
  createPreset,
  identifier,
  presets,
  ui: {
    idle,
    createError,
    createResult
  }
}) => {
  if (!presets) {
    return null
  }

  if (createResult) {
    return <Redirect to={ `/projects/${ identifier }/presets/${ createResult.contentType.replace('/', '_') }` } />
  }

  const filtered = SUPPORTED_CONTENT_TYPES.filter(
    ({ value }) => !Object.keys(presets).some((preset) => preset === value)
  )

  if (!filtered.length) {
    return (
      <Container>
        <Text>No content type to add</Text>
      </Container>
    )
  }

  return (
    <Container>
      { createError &&
        <ErrorBox>An error happens when creating the new preset.</ErrorBox>
      }
      <PresetForm
        idle={ idle }
        onSubmit={ ({ contentType }) => createPreset({ identifier, contentType }) }
        initialValues={ { contentType: filtered[0].value } }
        options={ filtered }
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
      (state, { params: { identifier } }) => {
        return {
          presets: selectors.presets(state, identifier),
          identifier
        }
      },
      mapDispatch({
        createPreset: actions.createPreset
      })
    )(PresetModal)
  )
)
