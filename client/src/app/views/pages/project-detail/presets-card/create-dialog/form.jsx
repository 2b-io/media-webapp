import React from 'react'

import { Break, Button, Form } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { Select  } from 'views/common/form'

const PresetForm = ({
  handleSubmit,
  idle,
  options
}) => (
  <Form handleSubmit={ handleSubmit }>
    <Select
      disabled={ !idle }
      name="contentType"
      options={ options }
    />
    <DescriptionText mostLeft mostRight>
      The Content-Type entity header is used to indicate the media type of the resource.
    </DescriptionText>
    <Break double />
    <Button type="submit" disabled={ !idle }>Add</Button>
  </Form>
)

export default PresetForm
