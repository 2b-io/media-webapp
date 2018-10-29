import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import ms from 'ms'

import { selectors } from 'state/interface'
import { Break, Container, LineChart } from 'ui/elements'
import { TextLine } from 'ui/typo'

import _UsageReportForm from './form'

//{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
const options = { month: 'short', day: 'numeric' }
const startDate = new Date('2017-10-01')
const endDate = new Date('2017-10-07')

const getBandwidthByDate = (startDate, endDate) => {
  const data = []
  const reportDate =  new Date(startDate)

  while (reportDate <= endDate) {
    data.push({
      date: reportDate.toLocaleDateString('en-US', options),
      bandwidth: Math.floor(Math.random() * 1e4),
      maxBandwidth: 10000
    })

    reportDate.setTime(reportDate.getTime()+ ms('1d'))
  }

  return data
}

const UsageReportForm = reduxForm({
  form: 'usageReportForm',
  enableReinitialize: true
})(_UsageReportForm)

const UsageReport = ({
  data,
  //idle,
  projects
}) => {
  if (!projects.length) {
    return <TextLine mostLeft mostRight>No project found.</TextLine>
  }

  const projectsSelect = projects.map((project) => ({
    label: `${ project.name } (${ project.identifier }) `,
    value: project.identifier
  }))

  const granularity = [
    {
      label: 'Daily (any period in previous 60 days)',
      value: 'daily'
    },
    {
      label: 'Hourly (any 14-day period in previous 60 days)',
      value: 'hourly'
    }
  ]

  const options = {
    projectsSelect,
    granularity
  }

  return (
    <Container>
      <UsageReportForm
        idle={ true }
        initialValues={ {
          project: options.projectsSelect[0].value,
          granularity: options.granularity[0].value
        } }
        onSubmit={ () => true }
        options={ options }
      />
      <Break double />
      <LineChart
        data={ data }
        projects={ projects }
      />
    </Container>
  )
}
export default connect(
  (state) => {
    const data = getBandwidthByDate(startDate, endDate)
    const projects = selectors.allProjects(state)

    return {
      data,
      projects
    }
  },
  null
)(UsageReport)
