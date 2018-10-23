import React from 'react'

import { Break, Button, Form } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { TextArea, TextBox } from 'views/common/form'

import CustomHeader from './custom-header'

const pullSettingForm = ({
  handleSubmit,
  idle
}) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      disabled={ !idle }
      label="Pull URL"
      name="pullURL"
      placeholder="https://example.com/assets"
    />
    <DescriptionText mostLeft mostRight>
      Optional. If you want Media CDN to request your content from a directory in your origin, enter the directory here, for example, https://example.com/assets. Do not include a / at the end of the directory.
    </DescriptionText>
    <Break />
    <TextArea
      disabled={ !idle }
      label="Allowed Origins"
      name="allowedOrigins"
      placeholder="example.com"
    />
    <DescriptionText mostLeft mostRight>
      Optional. If you want to restrict Media CDN requesting to specified origins, enter the allowed origins here.
    </DescriptionText>
    <Break />
    <CustomHeader
      idle={ idle }
      name="headers"
    />
    <DescriptionText mostLeft mostRight>
      All custom header keys and values you specify here will be included in every request to the origin.
    </DescriptionText>
    <Break double />
    <Button disabled={ !idle } type="submit" >Save</Button>
  </Form>
)

export default pullSettingForm
