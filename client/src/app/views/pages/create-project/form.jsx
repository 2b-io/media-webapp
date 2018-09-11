import React from 'react'

import { Button } from 'ui/elements'
import { Form } from 'ui/compounds'
import { TextBox, RadioButtons } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const CDN_LIST = [
  {
    id: '1',
    label: 'Amazon CloudFront',
    value: 'cloundFront'
  },
  {
   id: '2',
    label: 'Key CDN',
    value: 'keyCDN'
  }
]

const projectForm = ({ handleSubmit, idle }) => (
  <Form handleSubmit={ handleSubmit }>
    <Form.Line>
      <TextBox
        label="Project Name"
        name="name"
        placeholder="My Awesome Project"
        disabled={ !idle }
        validate={ validateRequired }
      />
    </Form.Line>

    <Form.Line>
      <RadioButtons name='choose' options={ CDN_LIST }/>
    </Form.Line>
    <Form.Line last>
      <Button
        type="submit"
        disabled={ !idle }
        variant="primary"
      >
        Create
      </Button>
    </Form.Line>
  </Form>
)

export default projectForm
