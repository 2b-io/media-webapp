import React, { Fragment } from 'react'

import { Break } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { SlideBar } from 'views/common/form'

const PngParameterForm = () => (
  <Fragment>
    <SlideBar
      label="Quality"
      name="quality"
      min="0"
      max="100"
    />
    <DescriptionText mostLeft mostRight>
      Set maximum image quality factor (0-100)
    </DescriptionText>
    <Break />
    <SlideBar
      label="Speed"
      name="speed"
      min="1"
      max="10"
    />
    <DescriptionText mostLeft mostRight>
      Speed/quality trade-off from 1 (brute-force) to 10 (fastest). The default is 3. Speed 10 has 5% lower quality, but is 8 times faster than the default.
    </DescriptionText>
  </Fragment>
)

export default PngParameterForm
