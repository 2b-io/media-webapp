import ms from 'ms'
import React from 'react'

import dateTimeService from 'services/date-time'
import { Break, Form, PrimaryButton, ResponsiveGrid } from 'ui/elements'
import { DatePicker, Select } from 'views/common/form'
import { validateRequired } from 'views/common/validate'

const BREAK_POINTS = {
  phone: 1,
  tablet: 2,
  desktop: 4
}

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
      <ResponsiveGrid
        breakpoints={ BREAK_POINTS }
        items={ [
          {
            content: () => (
              <DatePicker
                disabled={ !idle }
                name="startDate"
                label="Start Date"
                type="date"
                validate={ validateRequired }
                min={ min }
                max={ currentDateRange.endDate }
              />
            )
          },
          {
            content: () => (
              <DatePicker
                disabled={ !idle }
                name="endDate"
                label="End date"
                type="date"
                validate={ validateRequired }
                min={ currentDateRange.startDate }
                max={ max }
              />
            )
          },
          {
            content: () => (
              <Select
                disabled={ !idle }
                name="granularity"
                label="Granularity (Daily or Hourly)."
                options={ options.granularity }
              />
            )
          },
          {
            content: () => (
              <Select
                disabled={ !idle }
                name="projectIdentifier"
                label="Project"
                options={ options.projects }
              />
            )
          }
        ] }
      />
      <Break double />
      <PrimaryButton
        disabled={ !idle }
        type="submit"
      >
        Generate Report
      </PrimaryButton>
    </Form>
  )
}

export default UsageReportForm
