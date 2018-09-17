import React from 'react'

import { Form } from 'ui/compounds'
import { Button, Break } from 'ui/elements'
// import { TextLine } from 'ui/typo'

import { TextBox, SlideBar } from 'views/common/form'
// import { validateRequired } from 'views/common/validate'

const PresetForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Content Type"
      name="contentType"
      placeholder="Content Type"
    />
    <Break />

    <SlideBar
      label="Quality"
      name="range"
      min="0"
      max="100"
    />
    <Break double />
    <Button
      type="submit"
    >
      Save
    </Button>
  </Form>
)

export default PresetForm
