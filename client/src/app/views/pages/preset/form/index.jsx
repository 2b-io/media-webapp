import React from 'react'

import { Form } from 'ui/compounds'
import { Break, Button } from 'ui/elements'
import { TextBox, CheckBox } from 'views/common/form'

import Jpeg from './jpeg'
import Gif from './gif'
import Png from './png'
import Svg from './svg'



const renderParameterForm = (contentType) => {

  switch (contentType) {
    case 'image/jpeg':
      return <Jpeg />

    case 'image/gif':
      return <Gif />

    case 'image/png':
      return <Png />

    case 'image/svg':
      return <Svg />
  }

  return null
}

const PresetForm = ({ contentType, handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Content Type"
      name="contentType"
      placeholder="Content Type"
      readOnly
    />
    <Break />
    <CheckBox
      name="isActive"
      label="Enable"
    />
    <Break />

    { renderParameterForm(contentType) }

    <Break double />
    <Button type="submit">
      Save
    </Button>
  </Form>
)

export default PresetForm
