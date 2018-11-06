import ms from 'ms'
import React from 'react'

import dateTimeService from 'services/date-time'
import { Break, Button, Form } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { DatePicker, Select } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const UsageReportForm = ({
  currentDateRange,
  handleSubmit,
  options,
  idle
}) => {
  const min = dateTimeService.getStartOfUTCDay(new Date(Date.now() - ms('60d')))
  const max = dateTimeService.getStartOfUTCDay(new Date())

  return (
    <Form handleSubmit={ handleSubmit } idle={ idle }>
      <DatePicker
        disabled={ !idle }
        name="startDate"
        placeholder="Start date"
        type="date"
        validate={ validateRequired }
        min={ min }
        max={ currentDateRange.endDate }
      />
      <DescriptionText mostLeft mostRight>
        Start date.
      </DescriptionText>
      <Break />
      <DatePicker
        disabled={ !idle }
        name="endDate"
        placeholder="End date"
        type="date"
        validate={ validateRequired }
        min={ currentDateRange.startDate }
        max={ max }
      />
      <DescriptionText mostLeft mostRight>
        End date.
      </DescriptionText>
      <Break />
      <Select
        disabled={ !idle }
        name="granularity"
        options={ options.granularity }
      />
      <DescriptionText mostLeft mostRight>
        Granularity (Daily or Hourly).
      </DescriptionText>
      <Break />
      <Select
        disabled={ !idle }
        name="projectIdentifier"
        options={ options.projects }
      />
      <DescriptionText mostLeft mostRight>
        Project you need to see report.
      </DescriptionText>
      <Break double />
      <Button
        disabled={ !idle }
        type="submit"
      >
        Generate Report
      </Button>
    </Form>
  )
}

export default UsageReportForm
