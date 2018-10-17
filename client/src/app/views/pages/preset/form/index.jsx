import React from 'react'

import { Form } from 'ui/compounds'
import { Break, Button } from 'ui/elements'
import { TextBox, CheckBox } from 'views/common/form'

import Jpeg from './jpeg'
import Gif from './gif'
import Png from './png'
import Svg from './svg'

const renderParameterForm = (contentType, idle) => {

  switch (contentType) {
    case 'image/jpeg':
      return <Jpeg idle={ idle } />

    case 'image/gif':
      return <Gif idle={ idle } />

    case 'image/png':
      return <Png idle={ idle } />

    case 'image/svg+xml':
      return <Svg idle={ idle } />
  }

  return null
}

const PresetForm = ({
  contentType,
  handleSubmit,
  idle
}) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      disabled={ !idle }
      label="Content Type"
      name="contentType"
      placeholder="Content Type"
      readOnly
    />
    <Break />
    <CheckBox
      disabled={ !idle }
      name="isActive"
      label="Enable"
    />
    <Break />

    { renderParameterForm(contentType, idle) }

    <Break double />
    <Button disabled={ !idle } type="submit">
      Save
    </Button>
  </Form>
)

export default PresetForm
