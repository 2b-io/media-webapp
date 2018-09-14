import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Form } from 'ui/compounds'
import { Button, Break } from 'ui/elements'
import { CopyIcon } from 'ui/icons'
import { TextLine } from 'ui/typo'

import { CheckBox, TextBox, SlideBar } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const PresetForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Content Type"
      name="contentType"
      placeholder="Content Type"
    />
    <Break />

    <SlideBar
      initialValues="1"
      label="Quality"
      name="quality"
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
