import dateFormat from 'dateformat'
import humanSize from 'human-size'
import ms from 'ms'
import React, { Fragment } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import styled from 'styled-components'

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
      label: 'Daily',
      value: 'daily'
    },
    {
      label: 'Hourly',
      value: 'hourly'
    }
  ]
}

const Analysis = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const UsageReportForm = reduxForm({
  form: 'usageReportForm',
  enableReinitialize: true
})(_UsageReportForm)

const UsageReport = ({
  generateReport,
  options,
  ui: {
    data,
    idle,
    period,
    usageData,
    requestData
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
        data && data.bytesDownloaded  &&
          <Fragment>
            <AreaChart
              data={ data.bytesDownloaded.datapoints }
              dataConvert={ humanSize }
              name="Bytes Downloaded"
              period={ period }
              valueKey="value"
              xKey="timestamp"
              yKey="value"
              type="linear"
            />
            <Analysis>
              <TextLine mostLeft mostRight>
                Total Bytes: { humanSize(usageData.totalBytes) }
              </TextLine>
            </Analysis>
            <Break />
          </Fragment>
      }
      {
        data && data.requests &&
          <Fragment>
            <AreaChart
              data={ data.requests.datapoints }
              //dataConvert={ humanFormat }
              name="Requests"
              period={ period }
              valueKey="value"
              xKey="timestamp"
              yKey="value"
              type="linear"
            />
            <Analysis>
              <TextLine mostLeft mostRight>
                Average: { requestData.average }
              </TextLine>
              <TextLine mostLeft mostRight>
                Total: { requestData.total }
              </TextLine>
              <TextLine mostLeft mostRight>
                Maximum: { requestData.maximum }
              </TextLine>
              <TextLine mostLeft mostRight>
                Minimum: { requestData.minimum }
              </TextLine>
            </Analysis>
            <Break />
          </Fragment>
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
      label: `${ project.name } (${ project.identifier })`,
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
