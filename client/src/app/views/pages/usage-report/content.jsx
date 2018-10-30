import dateFormat from 'dateformat'
import ms from 'ms'
import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { AreaChart, Break, Container } from 'ui/elements'
import { TextLine } from 'ui/typo'

import _UsageReportForm from './form'

const DATA_DEFAULT = {
  date: {
    endDate: dateFormat(new Date(), 'yyyy-mm-dd'),
    startDate: dateFormat(new Date()- ms('7d'), 'yyyy-mm-dd')
  },
  granularity: [
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
          projectIdentifier: options.projects[0].value,
          granularity: options.granularity[0].value,
          startDate: DATA_DEFAULT.date.startDate,
          endDate: DATA_DEFAULT.date.endDate
        } }
        onSubmit={ generateReport }
        options={ options }
      />
      <Break double />
      {
        data &&
          <AreaChart
            data={ data.datapoints }
            name={ data.name }
            period={ data.period }
            valueKey="value"
            xKey="timestamp"
            yKey="value"
            type="linear"
          />
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
      granularity: DATA_DEFAULT.granularity
    }

    return {
      options
    }
  },
  mapDispatch({
    generateReport: actions.generateReport
  })
)(UsageReport)
