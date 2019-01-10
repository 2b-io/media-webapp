import React from 'react'

import { Break, Form, Link, PrimaryButton } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { Radio, TextBox } from 'views/common/form'
import { validateDomain, validateRequired } from 'views/common/validate'

const projectForm = ({ handleSubmit, idle }) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      label="Project Name"
      name="name"
      disabled={ !idle }
      validate={ validateRequired }
      maxLength={ 50 }
    />
    <Break />
    <TextBox
      label="Domain"
      name="domain"
      disabled={ !idle }
      validate={ [ validateRequired, validateDomain ] }
      maxLength={ 50 }
    />
    <Break />
    <TextBox
      label="Protocol"
      name="protocol"
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
    <PrimaryButton
      disabled={ !idle }
      type="submit"
    >
      Create
    </PrimaryButton>
  </Form>
)

export default projectForm
