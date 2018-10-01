import React from 'react'

import { Form } from 'ui/compounds'
import { Button, Break, Link } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { TextArea } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const CacheInvalidForm = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextArea
      label="Patterns"
      name="Patterns"
      placeholder="Patterns"
      validate={ validateRequired }
    />
    <DescriptionText mostLeft mostRight>
      The paths of the media that you want to invalidate with this invalidation batch. You can specify a * wildcard at the end of a path to invalidate multiple objects, for example, all of the objects in a directory. If you specify a * in the middle of a path, Media CDN treats it as a * character, not as a wildcard.&nbsp;
      <Link href="#">Read more.</Link>
    </DescriptionText>
    <Break double />
    <Button
      variant="primary"
      type="submit"
    >Invalidate</Button>
  </Form>
)

export default CacheInvalidForm
