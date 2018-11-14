import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { List, ContextMenu } from 'ui/elements'
import { ExpandIcon } from 'ui/icons'
import { DescriptionTextLine, TextLine } from 'ui/typo'

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

const renderOptions = (options, currentValue, onChoose) => {
  const items = options.map(
    ({ label, value }) => ({
      key: value,
      content: () => (
        <TextLine mostLeft mostRight
          variant={ value === currentValue ? 'primary' : null }>
          { label }
        </TextLine>
      ),
      onClick: () => onChoose(value)
    })
  )

  return (
    <List items={ items } interactable={ true } />
  )
}

const findLabelByValue = (options, value) => {
  const option = options.filter(option => option.value === value).shift()

  return option && option.label
}

const Select = ({
  disabled,
  options,
  value,
  label,
  onBlur, onChange, onFocus,
  meta: {
    active
  }
}) => (
  <Wrapper>
    <DescriptionTextLine mostLeft mostRight>
      { label }
    </DescriptionTextLine>
    <Input>
      <TextLine mostLeft>
        <DisableState disabled={ disabled }>
          { findLabelByValue(options, value) }
        </DisableState>
      </TextLine>
      <ContextMenu.Menu
        disabled={ disabled }
        icon={ () => (
          <DisableState disabled={ disabled }>
            <ExpandIcon />
          </DisableState>
        ) }
        content={ () => renderOptions(options, value, (...args) => {
          onChange(...args)
          onBlur()
        }) }
        stateless={ true }
        isActive={ active }
        activate={ onFocus }
        deactivate={ onBlur }
      />
    </Input>
    <Indicator disabled={ disabled } />
  </Wrapper>
)

Select.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }))
}

export default Select
