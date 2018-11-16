import React from 'react'
import { FormSection } from 'redux-form'

import {
  Break,
  Form,
  ButtonGroup, LinkButton, PrimaryButton
} from 'ui/elements'
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
  idle,
  showRemovePresetDialog
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
    <ButtonGroup>
      <PrimaryButton
        disabled={ !idle }
        type="submit"
      >
        Save
      </PrimaryButton>
      <LinkButton
        onClick={ showRemovePresetDialog }
        disabled={ !idle }
      >
        Permanently delete
      </LinkButton>
    </ButtonGroup>
  </Form>
)

export default PresetForm
