import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { List, ContextMenu } from 'ui/elements'
import { CheckIcon, ExpandIcon } from 'ui/icons'
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
  cursor: pointer;
`

const Indicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: ${ ({ theme }) => theme.black.base };
`

const renderOptions = (options, currentValue, onChoose) => {
  const items = options.map(
    ({ label, value }) => ({
      key: value,
      content: () => (
        <TextLine mostLeft
          mostRight={ value !== currentValue }>
          { label }
        </TextLine>
      ),
      trailing: value === currentValue ?
        () => <CheckIcon /> :
        null,
      onClick: () => onChoose(value)
    })
  )

  return (
    <List items={ items } />
  )
}

const findLabelByValue = (options, value) => {
  const option = options.filter(option => option.value === value).shift()

  return option && option.label
}

const Select = ({
  options,
  active, value,
  onBlur, onChange, onFocus
}) => (
  <Wrapper>
    <Input>
      <TextLine mostLeft>
        { findLabelByValue(options, value) }
      </TextLine>
      <ContextMenu.Menu
        icon={ () => <ExpandIcon /> }
        content={ () => renderOptions(options, value, onChange) }
        stateless={ true }
        isActive={ active }
        activate={ onFocus }
        deactivate={ onBlur }
      />
    </Input>
    <Indicator />
  </Wrapper>
)

Select.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }))
}

export default Select
