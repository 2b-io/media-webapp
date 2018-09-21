import React from 'react'

import { Button, Break } from 'ui/elements'
import { Form } from 'ui/compounds'
import { DescriptionText } from 'ui/typo'
import { TextBox  } from 'views/common/form'

const PresetForm = ({
  handleSubmit,
  idle
}) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Content Type"
      name="contentType"
    />
    <DescriptionText mostLeft mostRight>
      The Content-Type entity header is used to indicate the media type of the resource.
    </DescriptionText>
    <Break double />
    <Button type="submit" disabled={ !idle }>Add</Button>
  </Form>
)

export default PresetForm
