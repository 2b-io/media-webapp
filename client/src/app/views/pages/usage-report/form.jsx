import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Break, Button, Form, TextButton } from 'ui/elements'
import { CopyIcon } from 'ui/icons'
import { DescriptionText, TextLine } from 'ui/typo'

import { CheckBox, Select, TextBox } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const UsageReportForm = ({
  handleSubmit,
  options,
  idle
}) => (
  <Form handleSubmit={ handleSubmit } idle={ idle }>
    <TextBox
      disabled={ !idle }
      name="startDate"
      placeholder="Start date"
      type="date"
      validate={ validateRequired }
    />
    <DescriptionText mostLeft mostRight>
      Start date.
    </DescriptionText>
    <Break />
    <TextBox
      disabled={ !idle }
      name="endDate"
      placeholder="End date"
      type="date"
      validate={ validateRequired }
    />
    <DescriptionText mostLeft mostRight>
      End date.
    </DescriptionText>
    <Break />
    <Select
      disabled={ !idle }
      name="granularity"
      options={  options.granularity }
    />
    <DescriptionText mostLeft mostRight>
      Granularity (Daily or Hourly).
    </DescriptionText>
    <Break />
    <Select
      disabled={ !idle }
      name="project"
      options={  options.projectSelect }
    />
    <DescriptionText mostLeft mostRight>
      Project you need to see report.
    </DescriptionText>
    <Break double />
    <Button
      disabled={ !idle }
      type="submit"
    >
      Print Report
    </Button>
  </Form>
)

export default UsageReportForm
