import React, { Fragment } from 'react'
import styled from 'styled-components'

import dataFormat from 'services/data-format'
import { AreaChart, Break } from 'ui/elements'
import { DescriptionTextLine, TextLine } from 'ui/typo'

const AreaChartDetail = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

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

const renderTooltip = (period, format, tooltipText) => ({ payload, label }) => (
  <Content>
    <Border />
    <AreaChartContent>
      <DescriptionTextLine mostLeft mostRight>
        {
          `Date: ${
            period === 'hourly' ?
              dataFormat.formatTime(label, 'UTC:mmm, dd, HH:MM') :
              dataFormat.formatTime(label, 'UTC:mmm, dd')
          }`
        }
      </DescriptionTextLine>
      <DescriptionTextLine mostLeft mostRight>
        {
          `${ tooltipText }: ${ format(payload[0].value) }`
        }
      </DescriptionTextLine>
    </AreaChartContent>
  </Content>
)

const _CustomizedXAxisTick = ({
  className,
  payload,
  period,
  x, y
}) => (
  <g transform={ `translate(${ x },${ y })` } className={ className }>
    <text x={ 0 } y={ 0 } dy={ 16 } textAnchor="middle" fill="currentColor">
      {
        dataFormat.formatTime(payload.value, 'UTC:mmm, dd')
      }
    </text>
    { period === 'hourly' &&
      <text x={ 0 } y={ 0 } dy={ 32 } textAnchor="middle" fill="currentColor">
        {
          dataFormat.formatTime(payload.value, 'UTC:HH:MM')
        }
      </text>
    }
  </g>
)

const CustomizedXAxisTick = styled(_CustomizedXAxisTick)`
  & text {
    color: ${ ({ theme }) => theme.secondary.base };
    line-height: 24px;
    font-size: 12px;
  }
`

const renderXAxisTick = (period) => ({ payload, x, y }) => (
  <CustomizedXAxisTick
    payload={ payload }
    period={ period }
    x={ x } y={ y }
  />
)

const _CustomizedYAxisTick = ({
  convertData,
  className,
  payload,
  x, y
}) => (
  <g transform={ `translate(${ x },${ y })` } className={ className }>
    <text
      x={ -8 } y={ 0 } dy={ 8 }
      textAnchor="end"
      fill="currentColor"
    >
      {
        convertData ?
          convertData(payload.value) :
          payload.value
      }
    </text>
  </g>
)

const CustomizedYAxisTick = styled(_CustomizedYAxisTick)`
  & text {
    color: ${ ({ theme }) => theme.secondary.base };
    line-height: 24px;
    font-size: 12px;
  }
`

const renderYAxisTick = (convertData) => ({ payload, x, y }) => (
  <CustomizedYAxisTick
    convertData={ convertData }
    payload={ payload }
    x={ x } y={ y }
  />
)

const OptimizeUsageReportChart = ({
  data,
  period
}) => {
  if (!data) {
    return null
  }

  const optTimeConsumed = data.OPT_TIME_CONSUMED
  const optRequests = data.OPT_REQUESTS

  return (
    <Fragment>
      {
        optTimeConsumed &&
          <Fragment>
            <AreaChart
              data={ optTimeConsumed.datapoints }
              name="Optimize Time Consumed"
              valueKey="value"
              xKey="timestamp"
              yKey="value"
              type="linear"
              customTooltip={ renderTooltip(period, dataFormat.formatMilisecondToString, 'Optimized time') }
              customXAxisTick={ renderXAxisTick(period) }
              customYAxisTick={ renderYAxisTick(dataFormat.formatMilisecondToString) }
            />
            <AreaChartDetail>
              <DescriptionTextLine>Time UTC</DescriptionTextLine>
              {
                optTimeConsumed.synthesizedData &&
                  <Analysis>
                    <TextLine mostLeft mostRight>
                      Total Time: { dataFormat.formatMilisecondToString(optTimeConsumed.synthesizedData.total, 'h:m:s') }
                    </TextLine>
                  </Analysis>
              }
            </AreaChartDetail>
            <Break />
          </Fragment>
      }
      {
        optRequests &&
          <Fragment>
            <AreaChart
              data={ optRequests.datapoints }
              name="Requests"
              valueKey="value"
              xKey="timestamp"
              yKey="value"
              type="linear"
              customTooltip={ renderTooltip(period, dataFormat.formatNumber, 'Requests') }
              customXAxisTick={ renderXAxisTick(period) }
              customYAxisTick={ renderYAxisTick(dataFormat.formatNumber) }
            />
            <AreaChartDetail>
              <DescriptionTextLine>Time UTC</DescriptionTextLine>
              {
                optRequests.synthesizedData &&
                  <Analysis>
                    <TextLine mostLeft mostRight>
                      Average: { dataFormat.formatNumber(optRequests.synthesizedData.average) }
                    </TextLine>
                    <TextLine mostLeft mostRight>
                      Total: { dataFormat.formatNumber(optRequests.synthesizedData.total) }
                    </TextLine>
                    <TextLine mostLeft mostRight>
                      Maximum: { dataFormat.formatNumber(optRequests.synthesizedData.maximum) }
                    </TextLine>
                    <TextLine mostLeft mostRight>
                      Minimum: { dataFormat.formatNumber(optRequests.synthesizedData.minimum) }
                    </TextLine>
                  </Analysis>
              }
            </AreaChartDetail>
            <Break />
          </Fragment>
      }
    </Fragment>
  )
}

export default OptimizeUsageReportChart
