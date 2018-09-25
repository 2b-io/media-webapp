import React from 'react'

import { Form } from 'ui/compounds'
import { Break, Button } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { Radio, TextBox } from 'views/common/form'

const PresetForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Content Type"
      name="contentType"
      placeholder="Content Type"
      readOnly
    />
    <Break />
    <Radio
      name="optimize"
      choice="-O1"
      label="Optimize Level 1"
    />
    <DescriptionText mostLeft mostRight>
      Stores only the changed portion of each image. This is the default.
    </DescriptionText>
    <Break />
    <Radio
      name="optimize"
      choice="-O2"
      label="Optimize Level 2"
    />
    <DescriptionText mostLeft mostRight>
      Also uses transparency to shrink the file further.
    </DescriptionText>
    <Break />
    <Radio
      name="optimize"
      choice="-O3"
      label="Optimize Level 3"
    />
    <DescriptionText mostLeft mostRight>
      Try several optimization methods (usually slower, sometimes better results).
    </DescriptionText>
    <Break double />
    <Button type="submit">
      Save
    </Button>
  </Form>
)

export default PresetForm
