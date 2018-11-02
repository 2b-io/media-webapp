import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ms from 'ms'
import { Calendar } from 'calendar'

import { List, ContextMenu } from 'ui/elements'
import { CheckIcon, CalendarIcon } from 'ui/icons'
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

const findLabelByValue = (options, value) => {
  const option = options.filter(option => option.value === value).shift()

  return option && option.label
}


const CalendarMonth = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 40px);
  line-height: 40px;
  margin: 0 auto;
  text-align: center;
`


const CalendarWrapper = () => {
  const today = new Date()
  const cal = new Calendar(1)
  console.log(today);
  console.log(today.getYear());
  console.log(today.getMonth());
  const monthDays = cal.monthDays(today)
  console.log('monthDays', monthDays);

  return (
    <CalendarMonth>
      <li>1 </li>
      <li>1 </li>
      <li>1 </li>
      <li>1 </li>
      <li>1 </li>
      <li>1 </li>
      <li>1 </li>
      <li>1 </li>
    </CalendarMonth>
  )
}

const DatePicker = ({
  disabled,
  options,
  active, value,
  onBlur, onChange, onFocus
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
