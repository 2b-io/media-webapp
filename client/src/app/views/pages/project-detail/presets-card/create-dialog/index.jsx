import React from 'react'
import { reduxForm } from 'redux-form'

import { Container } from 'ui/elements'
import { Text } from 'ui/typo'

import _PresetForm from './form'

const SUPPORTED_CONTENT_TYPES = [
  { label: 'image/gif', value: 'image/gif' },
  { label: 'image/jpeg', value: 'image/jpeg' },
  { label: 'image/png', value: 'image/png' },
  { label: 'image/svg+xml', value: 'image/svg+xml' }
]

const PresetForm = reduxForm({
  form: 'preset',
  enableReinitialize: true
})(_PresetForm)

const CreateDialog = ({
  createPreset,
  identifier,
  presets,
}) => {
  if (!presets) {
    return null
  }

  const filtered = SUPPORTED_CONTENT_TYPES.filter(
    ({ value }) => !Object.keys(presets).some((preset) => preset === value)
  )

  if (!filtered.length) {
    return (
      <Container>
        <Text>No more content type to add</Text>
      </Container>
    )
  }

  return (
    <Container>
      <PresetForm
        idle={ true }
        onSubmit={ ({ contentType }) => createPreset({ identifier, contentType }) }
        initialValues={ { contentType: filtered[0].value } }
        options={ filtered }
      />
    </Container>
  )
}

export default CreateDialog
