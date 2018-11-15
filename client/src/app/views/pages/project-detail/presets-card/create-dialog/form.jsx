import React from 'react'

import { Break, Form, PrimaryButton } from 'ui/elements'
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
      label="Content Type"
      name="contentType"
      options={ options }
    />
    <DescriptionText mostLeft mostRight>
      The Content-Type entity header is used to indicate the media type of the resource.
    </DescriptionText>
    <Break double />
    <PrimaryButton
      disabled={ !idle }
      type="submit"
    >
      Add
    </PrimaryButton>
  </Form>
)

export default PresetForm
