import dateFormat from 'dateformat'
import { Calendar } from 'calendar'
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import { ContextMenu } from 'ui/elements'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'ui/icons'
import { TextLine } from 'ui/typo'

const WEEKDAYS = [
  {
    name: 'Mon',
    isWeekend: false
  }, {
    name: 'Tue',
    isWeekend: false
  }, {
    name: 'Wed',
    isWeekend: false
  }, {
    name: 'Thu',
    isWeekend: false
  }, {
    name: 'Fri',
    isWeekend: false
  }, {
    name: 'Sat',
    isWeekend: true
  }, {
    name: 'Sun',
    isWeekend: true
  }
]

const WEEKENDS = [ 6, 0 ]

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
  color: ${ ({ isWeekend, theme }) => isWeekend && theme.secondary.base };
`

const CalendarDate = styled.span`
  text-decoration: ${ ({ isToday }) => isToday ? 'underline' : 'none' };
  color: ${
    ({ isValue, isWeekend, selectable, theme }) => {
      if (!selectable) {
        return '#e6e6e6'
      }

      if (isValue) {
        return theme.primary.base
      }

      if (isWeekend) {
        return theme.secondary.base
      }

      return '#111111'
    }
  };
  cursor: ${ ({ selectable }) => selectable ? 'pointer' : 'unset' };
`

const isSelectableDate = (date, selectedView, today, maxDay, minDay) => {
  const firstDayOfMonth = new Date(selectedView.getFullYear(), selectedView.getMonth(), 1)
  const lastDayOfMonth = new Date(selectedView.getFullYear(), selectedView.getMonth() + 1, 0)

  const isDateOfOtherMonth = Date.parse(firstDayOfMonth) > Date.parse(date) ||
    Date.parse(date) > Date.parse(lastDayOfMonth)

  if (isDateOfOtherMonth) {
    return false
  }

  if (maxDay && minDay) {
    return Date.parse(date) >= Date.parse(today) - minDay &&
      Date.parse(today) + maxDay >= Date.parse(date)
  }

  if (maxDay) {
    return Date.parse(today) + maxDay >= Date.parse(date)
  }

  if (minDay) {
    return Date.parse(today) - minDay <= Date.parse(date)
  }

  return true
}

const isSameDate = (date, otherDate) => date.toLocaleDateString() === otherDate.toLocaleDateString()

const isWeekend = (date) => WEEKENDS.some((weekend) => weekend === date.getDay())

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

const CalendarWrapper = ({
  maxDay,
  minDay,
  next,
  onChoose,
  prev,
  selectedMonth,
  selectedYear,
  value
}) => {
  const selectedView = new Date(selectedYear, selectedMonth, 1)
  const today = new Date()

  const cal = new Calendar(1)
  const monthDates = cal.monthDates(selectedYear, selectedMonth)
  const mergedDates = [].concat(...monthDates)

  const allDates = mergedDates.map(
    (date) => ({
      date,
      selectable: isSelectableDate(date, selectedView, today, maxDay, minDay),
      isToday: isSameDate(date, today),
      isValue: isSameDate(date, new Date(value)),
      isWeekend: isWeekend(date)
    })
  )

  return (
    <Fragment>
      <HeaderCalendar>
        <ChevronLeftIcon
          onClick={ () => prev(today) }
        />
        <TextLine>
          {
            dateFormat(selectedView, 'mmm, yyyy')
          }
        </TextLine>
        <ChevronRightIcon
          onClick={ () => next(today) }
        />
      </HeaderCalendar>
      <CalendarMonth>
        {
          WEEKDAYS.map(
            (weekDay, index) => <WeekDay key={ index } isWeekend={ weekDay.isWeekend }>{ weekDay.name }</WeekDay>
          )
        }
        {
          allDates.map(
            (dateInfo, index) => {
              const { date, selectable, isToday, isValue, isWeekend } = dateInfo

              return (
                <CalendarDate
                  key={ index }
                  onClick={ () => selectable ? onChoose(Date.parse(date)) : false }
                  selectable={ selectable }
                  isToday={ isToday }
                  isValue={ isValue }
                  isWeekend={ isWeekend }
                >
                  { date.getDate() }
                </CalendarDate>
              )
            }
          )
        }
      </CalendarMonth>
    </Fragment>
  )
}

const renderOptions = (value, maxDay, minDay, { month, year }, onChoose, next, prev) => (
  <CalendarWrapper
    maxDay={ maxDay }
    minDay={ minDay }
    next={ next }
    onChoose={ onChoose }
    prev={ prev }
    selectedMonth={ month }
    selectedYear={ year }
    value={ value }
  />
)

class DatePicker extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.value) {
      return prevState
    }

    const { month, year } = prevState

    if (month === null || year === null) {
      const date = new Date(nextProps.value)

      return {
        month: date.getMonth(),
        year: date.getFullYear()
      }
    }

    return prevState
  }

  constructor(...args) {
    super(...args)

    this.state = {
      month: null,
      year: null
    }
  }

  changeMonth(offset) {
    return () => {
      const { year, month } = this.state

      const changedMonth = month + offset

      if (changedMonth < 0) {
        this.setState({
          year: year - 1,
          month: 11
        })
      } else if (changedMonth > 11) {
        this.setState({
          year: year + 1,
          month: 0
        })
      } else {
        this.setState({
          month: changedMonth
        })
      }
    }
  }

  render() {
    const {
      disabled,
      active,
      maxDay, minDay,
      value,
      onBlur, onChange, onFocus
    } = this.props

    return (
      <Wrapper>
        <Input>
          <TextLine mostLeft>
            <DisableState disabled={ disabled }>
              { dateFormat(value, 'mm/dd/yyyy') }
            </DisableState>
          </TextLine>
          <ContextMenu.Menu
            disabled={ disabled }
            icon={ () => (
              <DisableState disabled={ disabled }>
                <CalendarIcon />
              </DisableState>
            ) }
            content={ () => renderOptions(value, maxDay, minDay, this.state, (...args) => {
              onChange(...args)
              onBlur()
            }, this.changeMonth(1), this.changeMonth(-1)) }
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
}

export default DatePicker
