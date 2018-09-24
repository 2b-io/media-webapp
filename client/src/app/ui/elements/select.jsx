import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { List } from 'ui/elements'
import { ExpandIcon } from 'ui/icons'
import { TextLine } from 'ui/typo'

const Wrapper = styled.div`
  position: relative;
`

const SelectButton = styled.div`
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

const DropdownMenu = styled.div`
  position: absolute;
  top: 32px;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
  border: 1px solid ${ ({ theme }) => theme.secondary.base };
  display: ${
    ({ isOpen }) => isOpen ? 'block' : 'none'
  };
`

class Select extends React.Component {
  constructor(props) {
    super(props)

    this.chooseOption = this.chooseOption.bind(this)
    this.hideDropdown = this.hideDropdown.bind(this)
    this.showDropdown = this.showDropdown.bind(this)
  }

  showDropdown() {
    document.addEventListener('click', this.hideDropdown)

    this.props.onFocus()
  }

  hideDropdown() {
    document.removeEventListener('click', this.hideDropdown)

    this.props.onBlur()
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideDropdown)
  }

  chooseOption(value) {
    this.props.onChange(value)
  }

  renderDataDropDown(options) {
    const items = options.map(
      option => ({
        key: option.value,
        content: () => (
          <TextLine mostLeft mostRight>
            { option.label }
          </TextLine>
        ),
        onClick: () => this.chooseOption(option.value)
      })
    )

    return (
      <List items={ items } />
    )
  }

  findLabelByValue(options, value) {
    const option = options.filter(option => option.value === value).shift()

    return option && option.label
  }

  render() {
    const { options, active, value } = this.props

    return (
      <Wrapper>
        <SelectButton onClick={ this.showDropdown }>
          <TextLine mostLeft mostRight>
            { this.findLabelByValue(options, value) }
          </TextLine>
          <ExpandIcon />
        </SelectButton>
        <Indicator />
        <DropdownMenu isOpen={ active }>
          { this.renderDataDropDown(options) }
        </DropdownMenu>
      </Wrapper>
    )
  }
}

Select.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }))
}

export default Select
