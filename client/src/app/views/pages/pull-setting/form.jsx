import React from 'react'

import { Break, Form, PrimaryButton } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { TextArea } from 'views/common/form'
import { validateDomain } from 'views/common/validate'

import CustomHeader from './custom-header'

const pullSettingForm = ({
  handleSubmit,
  idle
}) => (
  <Form handleSubmit={ handleSubmit }>
    <TextArea
      disabled={ !idle }
      label="Allowed Origins"
      name="allowedOrigins"
      validate={ validateDomain }
    />
    <DescriptionText mostLeft mostRight>
      (Optional) If you want to restrict Media CDN requesting to specified origins, enter the allowed origins here.
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
    <PrimaryButton
      disabled={ !idle }
      type="submit"
    >
      Save
    </PrimaryButton>
  </Form>
)

export default pullSettingForm
