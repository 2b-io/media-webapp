import React from 'react'

import { Form } from 'ui/compounds'
import { Button, Break, Link } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { Radio, TextBox } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const projectForm = ({ handleSubmit, idle }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Project Name"
      name="name"
      placeholder="My Awesome Project"
      disabled={ !idle }
      validate={ validateRequired }
      maxLength={ 50 }
    />
    <Break />
    <Radio
      disabled={ !idle }
      name="provider"
      choice="cloudfront"
      label="Amazon CloudFront"
    />
    <DescriptionText mostLeft mostRight>
      Amazon CloudFront is a global content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to your viewers with low latency and high transfer speeds.&nbsp;
      <Link href="https://aws.amazon.com/cloudfront/">Read more</Link>
    </DescriptionText>
    <Radio
      disabled={ !idle }
      name="provider"
      choice="keycdn"
      label="Key CDN"
      disabled
    />
    <DescriptionText mostLeft mostRight>
      KeyCDN is a service of proinity LLC.&nbsp;
      <Link href="https://www.keycdn.com/">Read more</Link>
    </DescriptionText>
    <Break double />
    <Button type="submit" disabled={ !idle }>Create</Button>
  </Form>
)

export default projectForm
