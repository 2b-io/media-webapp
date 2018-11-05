import dateFormat from 'dateformat'
import { Calendar } from 'calendar'
import React, { Fragment } from 'react'
import styled from 'styled-components'

import { ContextMenu } from 'ui/elements'
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
    <CalendarWrapper inputDate={ null }/>
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

const DisableDay = styled.span`
  color: #e6e6e6;
`

const isDateOfOtherMonth = (compareDate, currentDate) => {
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

  return Date.parse(compareDate) < Date.parse(firstDayOfMonth) || Date.parse(compareDate) > Date.parse(lastDayOfMonth)
}

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

const CalendarWrapper = ({ inputDate }) => {
  const today = new Date()
  const weekDays = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ]
  const weekends = [ 6, 0 ]

  const selectedDate = inputDate ? inputDate : today

  const cal = new Calendar(1)

  const selectedMonth = selectedDate.getMonth()
  const selectedYear = selectedDate.getFullYear()
  const monthDates = cal.monthDates(selectedYear, selectedMonth)

  const mergedDates = weekDays.concat(...monthDates)

  return (
    <Fragment>
      <HeaderCalendar>
        <ChevronLeftIcon />
        <TextLine>
          {
            dateFormat(selectedDate, 'mmm, yyyy')
          }
        </TextLine>
        <ChevronRightIcon />
      </HeaderCalendar>
      <CalendarMonth>
        {
          mergedDates.map(
            (date, index) => {
              // return day of week
              if (weekDays.some((weekDay) => weekDay === date)) {
                return <WeekDay key={ index } value={ date }>{ date }</WeekDay>
              }

              // Format for other day of current month in calendar
              if (isDateOfOtherMonth(date, selectedDate)) {
                return <DisableDay key={ index } value={ date }>{ date.getDate() }</DisableDay>
              }

              if (date.toLocaleDateString() === today.toLocaleDateString()) {
                return <ToDay key={ index } value={ date }>{ date.getDate() }</ToDay>
              }

              if (weekends.some((weekend) => weekend === date.getDay())) {
                return <Weekend key={ index } value={ date }>{ date.getDate() }</Weekend>
              }

              return <span key={ index } value={ date }>{ date.getDate() }</span>
            }
          )
        }
      </CalendarMonth>
    </Fragment>
  )
}

const DatePicker = ({
  disabled,
  //options,
  active,
  //value,
  onBlur, onFocus
}) => {
  return (
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
}

export default DatePicker
