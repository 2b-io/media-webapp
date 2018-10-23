import React, { Fragment } from 'react'

import { Break } from 'ui/elements'
import { Code, DescriptionText } from 'ui/typo'
import { SlideBar } from 'views/common/form'

const PngParameterForm = ({
  currentParameters = { minQuality: 65, maxQuality: 80 },
  idle
}) => {
  return (
    <Fragment>
      <SlideBar
        disabled={ !idle }
        name="minQuality"
        min="0"
        max={ parseInt(currentParameters.maxQuality, 10) - 1 }
      />
      <SlideBar
        disabled={ !idle }
        name="maxQuality"
        min={ parseInt(currentParameters.minQuality, 10) + 1 }
        max="100"
      />
      <DescriptionText mostLeft mostRight>
        Set minimum and maximum image quality factor.<br />
        Instructs <Code>pngquant</Code> to use the least amount of colors required to meet or exceed the max quality. If conversion results in quality below the min quality the image won&apos;t be saved (if outputting to stdout, 24-bit original will be output) and <Code>pngquant</Code> will exit with status code 99.<br />
        <Code>Minimum</Code> and <Code>maximum</Code> are numbers in range 0 (worst) to 100 (perfect).
      </DescriptionText>
      <Break />
      <SlideBar
        disabled={ !idle }
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
}

export default PngParameterForm
