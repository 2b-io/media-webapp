import React, { Fragment } from 'react'

import { Break } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { CheckBox, SlideBar } from 'views/common/form'

const PngParameterForm = () => (
  <Fragment>
    <Break />
    <CheckBox
      name="progressive"
      label="Progressive"
    />
    <DescriptionText mostLeft mostRight>
      Lossless conversion to progressive
    </DescriptionText>
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
    <Break />
    <SlideBar
      label="Speed"
      name="speed"
      min="0"
      max="10"
    />
    <DescriptionText mostLeft mostRight>
      Speed/quality trade-off from 1 (brute-force) to 10 (fastest). The default is 3. Speed 10 has 5% lower quality, but is 8 times faster than the default.
    </DescriptionText>
    <Break />
    <SlideBar
      label="Compression"
      name="compressionLevel"
      min="0"
      max="9"
    />
    <DescriptionText mostLeft mostRight>
      Compression level, 0-9
    </DescriptionText>
  </Fragment>
)

export default PngParameterForm
