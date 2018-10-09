import React, { Fragment } from 'react'

import { DescriptionText } from 'ui/typo'
import { Radio } from 'views/common/form'

const GifParameterForm = () => (
  <Fragment>
    <Radio
      name="optimize"
      choice="-O1"
      label="Optimize Level 1"
    />
    <DescriptionText mostLeft mostRight>
      Stores only the changed portion of each image. This is the default.
    </DescriptionText>
    <Radio
      name="optimize"
      choice="-O2"
      label="Optimize Level 2"
    />
    <DescriptionText mostLeft mostRight>
      Also uses transparency to shrink the file further.
    </DescriptionText>
    <Radio
      name="optimize"
      choice="-O3"
      label="Optimize Level 3"
    />
    <DescriptionText mostLeft mostRight>
      Try several optimization methods (usually slower, sometimes better results).
    </DescriptionText>
  </Fragment>
)

export default GifParameterForm
