import ms from 'ms'
import React, { Fragment } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import styled from 'styled-components'

import dataFormat from 'services/data-format'
import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { AreaChart, Break, Container } from 'ui/elements'
import { DescriptionTextLine, TextLine } from 'ui/typo'

import _UsageReportForm from './form'

const DATA_DEFAULT = {
  date: {
    endDate: dataFormat.dateFormat(new Date(), 'yyyy-mm-dd'),
    startDate: dataFormat.dateFormat(new Date()- ms('7d'), 'yyyy-mm-dd')
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

const Border = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  border: 1px solid ${ ({ theme }) => theme.secondary.base };
`

const Content = styled.div`
  position: relative;
  box-shadow: 4px 4px ${ ({ theme }) => theme.black.opaque.base };
  background: ${
    ({ theme }) => theme.white.base
  };
`

const AreaChartContent = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 16px;
  background: transparent;
  color: ${ ({ theme }) => theme.black.base };
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
              dataConvert={ dataFormat.dataSize }
              name="Bytes Downloaded"
              period={ period }
              valueKey="value"
              xKey="timestamp"
              yKey="value"
              type="linear"
              customTooltip={ ({ payload, label }) => (
                <Content>
                  <Border />
                  <AreaChartContent>
                    <DescriptionTextLine mostLeft mostRight>
                      {
                        `Date: ${
                          period === 'hourly' ?
                            dataFormat.dateFormat(label, 'mmm, dd, HH:MM') :
                            dataFormat.dateFormat(label, 'mmm, dd')
                        }`
                      }
                    </DescriptionTextLine>
                    <DescriptionTextLine mostLeft mostRight>
                      {
                        `Total Bytes: ${ dataFormat.dataSize(payload[0].value) }`
                      }
                    </DescriptionTextLine>
                  </AreaChartContent>
                </Content>
              ) }
            />
            <Analysis>
              <TextLine mostLeft mostRight>
                Total Bytes: { dataFormat.dataSize(usageData.totalBytes) }
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
              dataConvert={ dataFormat.numberFormat }
              name="Requests"
              period={ period }
              valueKey="value"
              xKey="timestamp"
              yKey="value"
              type="linear"
              customTooltip={ ({ payload, label }) => (
                <Content>
                  <Border />
                  <AreaChartContent>
                    <DescriptionTextLine mostLeft mostRight>
                      {
                        `Date: ${
                          period === 'hourly' ?
                            dataFormat.dateFormat(label, 'mmm, dd, HH:MM') :
                            dataFormat.dateFormat(label, 'mmm, dd')
                        }`
                      }
                    </DescriptionTextLine>
                    <DescriptionTextLine mostLeft mostRight>
                      {
                        `Reports: ${ dataFormat.numberFormat(payload[0].value) }`
                      }
                    </DescriptionTextLine>
                  </AreaChartContent>
                </Content>
              ) }
            />
            <Analysis>
              <TextLine mostLeft mostRight>
                Average: { dataFormat.numberFormat(requestData.average) }
              </TextLine>
              <TextLine mostLeft mostRight>
                Total: { dataFormat.numberFormat(requestData.total) }
              </TextLine>
              <TextLine mostLeft mostRight>
                Maximum: { dataFormat.numberFormat(requestData.maximum) }
              </TextLine>
              <TextLine mostLeft mostRight>
                Minimum: { dataFormat.numberFormat(requestData.minimum) }
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
