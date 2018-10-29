import React, { Fragment } from 'react'

import { DescriptionText } from 'ui/typo'
import { CheckBox, SlideBar } from 'views/common/form'

const JpegParameterForm = ({ idle }) => (
  <Fragment>
    <SlideBar
      disabled={ !idle }
      label="Quality"
      name="quality"
      min="0"
      max="100"
    />
    <DescriptionText mostLeft mostRight>
      Set maximum image quality factor (0-100)
    </DescriptionText>
    <CheckBox
      disabled={ !idle }
      name="progressive"
      label="Progressive"
    />
    <DescriptionText mostLeft mostRight>
      Lossless conversion to progressive
    </DescriptionText>
  </Fragment>
)

export default JpegParameterForm
