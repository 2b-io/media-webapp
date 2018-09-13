import React from 'react'

import { Form } from 'ui/compounds'
import { Button, Break } from 'ui/elements'
import { TextArea, TextBox } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const pullSettingForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Pull URL"
      name="pullURL"
      placeholder="https://example.com"
      validate={ validateRequired }
    />
    <Break />
    <TextArea
      label="Allowed Origins"
      name="allowedOrigins"
      placeholder="example.com"
      validate={ validateRequired }
    />
    <Break double />
    <Button type="submit" >Save</Button>
  </Form>
)

export default pullSettingForm

