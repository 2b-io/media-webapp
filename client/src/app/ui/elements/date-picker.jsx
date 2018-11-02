import dateFormat from 'dateformat'
import { Calendar } from 'calendar'
import ms from 'ms'
import React, { Fragment } from 'react'
import styled from 'styled-components'

import { List, ContextMenu } from 'ui/elements'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'ui/icons'
import { TextLine } from 'ui/typo'

const Wrapper = styled.div`
  position: relative;
`

const Input = styled.div`
  display: grid;
  & > * {
    min-width: 0;
    min-height: 0;
  };
  grid-template-columns: 1fr 40px;
`

const Indicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: ${
    ({ disabled, theme }) => disabled ?
      theme.secondary.base :
      theme.black.base
  };
`

const DisableState = styled.div`
  color: ${
    ({ disabled, theme }) => disabled ?
      theme.secondary.base :
      theme.black.base
  };
`

const renderOptions = () => {

  return (
    <CalendarWrapper />
  )
}

const CalendarMonth = styled.ul`
  display: grid;
  & > * {
    min-width: 0;
    min-height: 0;
  }
  grid-template-columns: repeat(7, 40px);
  line-height: 40px;
  margin: 0 auto;
  text-align: center;
`

const WeekDay = styled.span`
  font-weight: bold;
`

const Weekend = styled.span`
  color: ${ ({ theme }) => theme.secondary.base };
`

const ToDay = styled.span`
  color: ${ ({ theme }) => theme.primary.base };
  font-weight: bold;
`

const HeaderCalendar = styled.div`
  display: grid;
  & > * {
    min-width: 0;
    min-height: 0;
  }
  grid-template-columns: 40px 1fr 40px;
  line-height: 40px;
  margin: 0 auto;
  text-align: center;
`

const CalendarWrapper = () => {
  const today = new Date()
  const weekDays = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ]
  const weekends = [ 6, 0 ]

  const cal = new Calendar(1)
  const thisMonth = today.getMonth()
  const thisYear = today.getFullYear()
  const monthDates = cal.monthDates(thisYear, thisMonth)
  const mergedDates = weekDays.concat(...monthDates)

  return (
    <Fragment>
      <HeaderCalendar>
        <ChevronLeftIcon />
        <TextLine>
          {
            dateFormat(today, 'mmm, yyyy')
          }
        </TextLine>
        <ChevronRightIcon />
      </HeaderCalendar>
      <CalendarMonth>
        {
          mergedDates.map(
            (date, index) => {

              if (weekDays.some((weekDay) => weekDay === date)) {
                return <WeekDay key={ index }>{ date }</WeekDay>
              }

              if (date.toLocaleDateString() === today.toLocaleDateString()) {
                return <ToDay key={ index }>{ date.getDate() }</ToDay>
              }

              if (weekends.some((weekend) => weekend === date.getDay())) {
                return <Weekend key={ index }>{ date.getDate() }</Weekend>
              }

              return <span key={ index }>{ date.getDate() }</span>
            }
          )
        }
      </CalendarMonth>
    </Fragment>
  )
}

const DatePicker = ({
  disabled,
  options,
  active, value,
  onBlur, onChange, onFocus,
}) => (
  <Wrapper>
    <Input>
      <TextLine mostLeft>
        <DisableState disabled={ disabled }>
        10/26/2018
        </DisableState>
      </TextLine>
      <ContextMenu.Menu
        disabled={ disabled }
        icon={ () => (
          <DisableState disabled={ disabled }>
            <CalendarIcon />
          </DisableState>
        ) }
        content={ renderOptions }
        stateless={ true }
        isActive={ active }
        activate={ onFocus }
        deactivate={ onBlur }
      />
    </Input>
    <Indicator disabled={ disabled } />
  </Wrapper>
)

export default DatePicker
