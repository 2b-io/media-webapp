import { Calendar } from 'calendar'
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import dataFormat from 'services/data-format'
import { ContextMenu, PlainButton } from 'ui/elements'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'ui/icons'
import { DescriptionTextLine, TextLine } from 'ui/typo'

const WEEKDAYS = {
  Mon: { isWeekend: false },
  Tue: { isWeekend: false },
  Wed: { isWeekend: false },
  Thu: { isWeekend: false },
  Fri: { isWeekend: false },
  Sat: { isWeekend: true },
  Sun: { isWeekend: true }
}

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
  user-select: none;
  color: ${ ({ isWeekend, theme }) => isWeekend && theme.secondary.base };
`

const CalendarDate = styled.span`
  user-select: none;
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

      return theme.black.base
    }
  };
  cursor: ${ ({ selectable }) => selectable ? 'pointer' : 'unset' };
  ${
    ({ selectable, theme }) => selectable && theme.mouseDetected && !theme.touchDetected && `
      transition: background .3s;

      &:hover {
        background: ${ theme.hoverColor };
        color: ${ theme.primary.base };
        opacity: 0.7;
      }`
  }
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
  user-select: none;
`

const checkSelectable = (date, firstDayInMonth, lastDayInMonth, max, min) => {
  if (date < firstDayInMonth || lastDayInMonth < date) {
    return false
  }

  if (min && max) {
    return min <= date && date <= max
  }

  if (min) {
    return date >= min
  }

  if (max) {
    return date <= max
  }

  return true
}

const isSameDate = (date, otherDate) => date.toLocaleDateString() === otherDate.toLocaleDateString()

const isWeekend = (date) => WEEKDAYS[ dataFormat.formatTime(date, 'UTC:ddd') ].isWeekend

const CalendarWrapper = ({
  max,
  min,
  next,
  onChoose,
  prev,
  selectedMonth,
  selectedYear,
  value
}) => {
  const selectedView = new Date(
    Date.UTC(selectedYear, selectedMonth, 1, 0, 0, 0)
  )
  const today = new Date()

  const cal = new Calendar(1)
  const monthDates = cal.monthDates(selectedYear, selectedMonth)
  const mergedDates = [].concat(...monthDates).map(
    date => new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0))
  )

  const firstDayInMonth = new Date(
    Date.UTC(selectedYear, selectedMonth, 1, 0, 0, 0)
  )
  const lastDayInMonth = new Date(
    Date.UTC(selectedYear, selectedMonth + 1, 0, 0, 0)
  )

  const allDates = mergedDates.map(
    (date) => ({
      date,
      selectable: checkSelectable(date, firstDayInMonth, lastDayInMonth, max, min),
      isToday: isSameDate(date, today),
      isValue: isSameDate(date, new Date(value)),
      isWeekend: isWeekend(date)
    })
  )

  return (
    <Fragment>
      <HeaderCalendar>
        <PlainButton>
          <ChevronLeftIcon
            onClick={ prev }
          />
        </PlainButton>
        <TextLine>
          {
            dataFormat.formatTime(selectedView, 'UTC:mmm, yyyy')
          }
        </TextLine>
        <PlainButton>
          <ChevronRightIcon
            onClick={ next }
          />
        </PlainButton>
      </HeaderCalendar>
      <CalendarMonth>
        {
          Object.entries(WEEKDAYS).map(
            ([ name, { isWeekend } ]) => <WeekDay key={ name } isWeekend={ isWeekend }>{ name }</WeekDay>
          )
        }
        {
          allDates.map(
            (dateInfo, index) => {
              const { date, selectable, isToday, isValue, isWeekend } = dateInfo

              return (
                <CalendarDate
                  key={ index }
                  onClick={ selectable ? () => onChoose(date.valueOf()) : null }
                  selectable={ selectable }
                  isToday={ isToday }
                  isValue={ isValue }
                  isWeekend={ isWeekend }
                >
                  { dataFormat.formatTime(date, 'UTC:d') }
                </CalendarDate>
              )
            }
          )
        }
      </CalendarMonth>
    </Fragment>
  )
}

const renderOptions = (value, max, min, { month, year }, onChoose, next, prev) => (
  <CalendarWrapper
    max={ max }
    min={ min }
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
        month: date.getUTCMonth(),
        year: date.getUTCFullYear()
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

  resetState() {
    this.setState({
      month: null,
      year: null
    })
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
      meta: {
        active
      },
      max, min,
      label,
      value,
      onBlur, onChange, onFocus
    } = this.props

    return (
      <Wrapper>
        <DescriptionTextLine mostLeft mostRight>
          { label }
        </DescriptionTextLine>
        <Input>
          <TextLine mostLeft>
            <DisableState disabled={ disabled }>
              { dataFormat.formatTime(value, 'UTC:mm/dd/yyyy') }
            </DisableState>
          </TextLine>
          <ContextMenu.Menu
            disabled={ disabled }
            icon={ () => (
              <DisableState disabled={ disabled }>
                <CalendarIcon />
              </DisableState>
            ) }
            content={ () => renderOptions(value, max, min, this.state, (...args) => {
              onChange(...args)
              this.resetState()
              onBlur()
            }, this.changeMonth(1), this.changeMonth(-1)) }
            stateless={ true }
            isActive={ active }
            activate={ onFocus }
            deactivate={ () => {
              this.resetState()
              onBlur()
            } }
          />
        </Input>
        <Indicator disabled={ disabled } />
      </Wrapper>
    )
  }
}

export default DatePicker
