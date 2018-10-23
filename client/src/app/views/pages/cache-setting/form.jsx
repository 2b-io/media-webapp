import React from 'react'

import { Break, Button, Form } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { TextBox } from 'views/common/form'
import { validatePositiveNumber, validateRequired } from 'views/common/validate'

const CacheSettingForm = ({
  handleSubmit,
  idle
}) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      disabled={ !idle }
      name="ttl"
      placeholder="TTL"
      type="number"
      validate={ [ validateRequired, validatePositiveNumber ] }
    />
    <DescriptionText mostLeft mostRight>
      The default amount of time, in seconds, that you want objects to stay in Media CDN caches before Media CDN forwards another request to your origin to determine whether the object has been updated.
    </DescriptionText>
    <Break double />
    <Button
      disabled={ !idle }
      type="submit"
    >Save</Button>
  </Form>
)

export default CacheSettingForm
