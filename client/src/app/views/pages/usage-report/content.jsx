import dateFormat from 'dateformat'
import ms from 'ms'
import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { Break, Container, LineChart } from 'ui/elements'
import { TextLine } from 'ui/typo'

import _UsageReportForm from './form'

const DATA_DEFAULT = {
  DATE: {
    endDate: dateFormat(new Date(), "yyyy-mm-dd"),
    startDate: dateFormat(new Date()- ms('7d'), "yyyy-mm-dd")
  },
  STEP: [
    {
      label: 'Daily (any period in previous 60 days)',
      value: 'daily'
    },
    {
      label: 'Hourly (any 14-day period in previous 60 days)',
      value: 'hourly'
    }
  ]
}

const UsageReportForm = reduxForm({
  form: 'usageReportForm',
  enableReinitialize: true
})(_UsageReportForm)

const UsageReport = ({
  generateReport,
  options,
  ui: {
    data,
    idle
  }
}) => {
  if (!options.projects.length) {
    return <TextLine mostLeft mostRight>No project found.</TextLine>
  }

  return (
    <Container>
      <UsageReportForm
        idle={ idle }
        initialValues={ {
          identifier: options.projects[0].value,
          granularity: options.granularity[0].value,
          startDate: DATA_DEFAULT.DATE.startDate,
          endDate: DATA_DEFAULT.DATE.endDate
        } }
        onSubmit={ generateReport }
        options={ options }
      />
      <Break double />
      {
        data && <LineChart data={ data } />
      }
    </Container>
  )
}
export default connect(
  (state) => {
    const projects = selectors.allProjects(state)

    if (!projects) {
      return null
    }

    const projectsSelect = projects.map((project) => ({
      label: `${ project.name } (${ project.identifier }) `,
      value: project.identifier
    }))

    const options = {
      projects: projectsSelect,
      granularity: DATA_DEFAULT.STEP
    }

    return {
      options
    }
  },
  mapDispatch({
    generateReport: actions.generateReport
  })
)(UsageReport)
