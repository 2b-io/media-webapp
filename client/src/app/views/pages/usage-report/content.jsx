import ms from 'ms'
import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import dataFormat from 'services/data-format'
import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Break, Container } from 'ui/elements'
import { TextLine } from 'ui/typo'

import UsageReportChart from './chart'
import _UsageReportForm from './form'

const DATA_DEFAULT = {
  date: {
    endDate: dataFormat.formatTime(new Date(), 'yyyy-mm-dd'),
    startDate: dataFormat.formatTime(new Date()- ms('7d'), 'yyyy-mm-dd')
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
  form: 'usageReportForm',
  enableReinitialize: true
})(_UsageReportForm)

const UsageReport = ({
  generateUsageReport,
  projects,
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
      projects
    }
  },
  mapDispatch({
    generateUsageReport: actions.generateUsageReport
  })
)(UsageReport)
