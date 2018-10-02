import React, { Fragment } from 'react'

import { Break } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { CheckBox, SlideBar, TextBox } from 'views/common/form'

const JpegParameterForm = () => (
  <Fragment>
    <TextBox
      label="Content Type"
      name="contentType"
      placeholder="Content Type"
      readOnly
    />
    <Break />
    <CheckBox
      name="isActive"
      label="Enable"
    />
    <Break />
    <SlideBar
      label="Quality"
      name="quality"
      min="0"
      max="100"
    />
    <DescriptionText mostLeft mostRight>
      Set maximum image quality factor (0-100)
    </DescriptionText>
    <CheckBox
      name="progressive"
      label="Progressive"
    />
    <DescriptionText mostLeft mostRight>
      Lossless conversion to progressive
    </DescriptionText>
  </Fragment>
)

export default JpegParameterForm
