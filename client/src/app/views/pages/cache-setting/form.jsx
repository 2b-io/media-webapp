import React from 'react'

import { Form } from 'ui/compounds'
import { Button, Break } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { TextBox } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const CacheSettingForm = ({
  handleSubmit,
  idle
}) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      disabled={ !idle }
      label="Seconds"
      name="expired"
      placeholder="Seconds"
      type="number"
      validate={ validateRequired }
    />
    <DescriptionText mostLeft mostRight>
      Expire time. (Must be numbers)
    </DescriptionText>
    <Break double />
    <Button
      disabled={ !idle }
      type="submit"
    >Save</Button>
  </Form>
)

export default CacheSettingForm
