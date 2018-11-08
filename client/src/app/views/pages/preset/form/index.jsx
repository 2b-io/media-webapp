import React from 'react'
import { FormSection } from 'redux-form'

import { Break, Button, Form } from 'ui/elements'
import { TextBox, CheckBox } from 'views/common/form'

import Jpeg from './jpeg'
import Gif from './gif'
import Png from './png'
import Svg from './svg'

const renderParameterForm = (contentType, props) => {
  switch (contentType) {
    case 'image/jpeg':
      return <Jpeg { ...props } />

    case 'image/gif':
      return <Gif { ...props } />

    case 'image/png':
      return <Png { ...props } />

    case 'image/svg+xml':
      return <Svg { ...props } />
  }

  return null
}

const PresetForm = ({
  contentType,
  currentParameters,
  handleSubmit,
  idle
}) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      disabled={ !idle }
      label="Content Type"
      name="contentType"
      readOnly
    />
    <Break />
    <CheckBox
      disabled={ !idle }
      name="isActive"
      label="Enable"
    />
    <Break />

    <FormSection name="parameters">
      {
        renderParameterForm(contentType, {
          currentParameters,
          idle
        })
      }
    </FormSection>

    <Break double />
    <Button disabled={ !idle } type="submit">
      Save
    </Button>
  </Form>
)

export default PresetForm
