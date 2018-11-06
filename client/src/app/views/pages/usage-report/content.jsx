import ms from 'ms'
import React from 'react'
import { formValueSelector, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import dateTimeService from 'services/date-time'
import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Break, Container } from 'ui/elements'
import { TextLine } from 'ui/typo'

import UsageReportChart from './chart'
import _UsageReportForm from './form'

const DATA_DEFAULT = {
  date: {
    endDate: dateTimeService.getStartOfUTCDay(new Date()),
    startDate: dateTimeService.getStartOfUTCDay(new Date()) - ms('7d')
  },
  granularity: [
    {
      label: 'Daily',
      value: 'daily'
    },
    {
      label: 'Hourly',
      value: 'hourly'
    }
  ]
}

const UsageReportForm = reduxForm({
  form: 'USAGE_REPORT_FORM',
  enableReinitialize: true
})(_UsageReportForm)

const formSelector = formValueSelector('USAGE_REPORT_FORM')

const UsageReport = ({
  generateUsageReport,
  projects,
  startDate,
  endDate,
  ui: {
    data,
    idle,
    period,
    usageData,
    requestData
  }
}) => {
  if (!projects.length) {
    return <TextLine mostLeft mostRight>No project found.</TextLine>
  }

  const projectsSelectData = projects.map((project) => ({
    label: `${ project.name } (${ project.identifier })`,
    value: project.identifier
  }))

  return (
    <Container>
      <UsageReportForm
        idle={ idle }
        initialValues={ {
          projectIdentifier: projectsSelectData[0].value,
          granularity: DATA_DEFAULT.granularity[0].value,
          startDate: DATA_DEFAULT.date.startDate,
          endDate: DATA_DEFAULT.date.endDate
        } }
        onSubmit={ generateUsageReport }
        options={ {
          projects: projectsSelectData,
          granularity: DATA_DEFAULT.granularity
        } }
        currentDateRange={ { startDate, endDate } }
      />
      <Break double />
      <UsageReportChart
        data={ data }
        period={ period }
        usageData={ usageData }
        requestData={ requestData }
      />
    </Container>
  )
}

export default connect(
  (state) => {
    const projects = selectors.allProjects(state)

    if (!projects) {
      return null
    }

    return {
      projects,
      startDate: formSelector(state, 'startDate'),
      endDate: formSelector(state, 'endDate')
    }
  },
  mapDispatch({
    generateUsageReport: actions.generateUsageReport
  })
)(UsageReport)
