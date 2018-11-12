import ms from 'ms'
import React from 'react'

import dateTimeService from 'services/date-time'
import { Break, Button, Form } from 'ui/elements'
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
        label="Start Date"
        type="date"
        validate={ validateRequired }
        min={ min }
        max={ currentDateRange.endDate }
      />
      <Break />
      <DatePicker
        disabled={ !idle }
        name="endDate"
        label="End date"
        type="date"
        validate={ validateRequired }
        min={ currentDateRange.startDate }
        max={ max }
      />
      <Break />
      <Select
        disabled={ !idle }
        name="granularity"
        label="Granularity (Daily or Hourly)."
        options={ options.granularity }
      />
      <Break />
      <Select
        disabled={ !idle }
        name="projectIdentifier"
        label="Project"
        options={ options.projects }
      />
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
