import React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import { List } from 'ui/elements'
import { ExpandIcon } from 'ui/icons'
import { DescriptionText, TextLine } from 'ui/typo'

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
  white-space: nowrap;
  cursor: pointer;
  border-bottom: 2px solid ${ ({ theme }) => theme.black.base };
`

const DropdownMenu = styled.ul.attrs({
  style: ({ isOpen }) => ({
    display: `${ isOpen ? 'block' : 'none' }`
  })
})`
  position: absolute;
  top: 36px;
  left: 0;
  right: 4px;
  z-index: 1000;
  display: none;
  background-color: ${ ({ theme }) => theme.white.base };
  border: 1px solid ${ ({ theme }) => theme.secondary.base };;
`

const Item = styled.li`
  cursor: pointer;
  &:hover,
  &:active {
    background: #ddd;
  }
`

class Select extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      labelItem: null,
      typeDropdown: null
    }
  }

  componentWillMount() {
    const { label } = this.props.list[0]

    if (typeof label != 'undefined') {
      this.checkType(false)
      this.setState({ contentType: label })
      this.props.input.onChange(label)
    } else {
      this.checkType(true)
      this.setState({ contentType: this.props.list[ 0 ] })
      this.props.input.onChange(this.props.list[ 0 ])
    }
  }

  checkType = (value) => {
    this.setState({
        typeDropdown: value
    })
  }

  showDropdown = () => {
    this.setState({ isOpen: true })
    document.addEventListener("click", this.hideDropdown)
  }

  hideDropdown = () => {
    this.setState({ isOpen: false })
    document.removeEventListener("click", this.hideDropdown)
  }

  chooseItem = (value) => {
    if (this.state.contentType !== value) {
      this.setState({
        contentType: value
      })
      this.props.input.onChange(value)
    }
  }

  renderDataDropDown = (item, index) => {
    const { value, label } = this.state.typeDropdown ? { value: index, label: item } : item
    return (
      <Item
        key={ index }
        value={ value }
        onClick={ () => this.chooseItem(label) }
      >
        <TextLine mostLeft mostRight><option>{ label }</option></TextLine>
      </Item>
    )
  }

  render () {
    const { list, input } = this.props

    return (
      <Wrapper>
        <SelectButton
          onChange={ () => input.onChange( this.state ) }
          name="contentType"
          onClick={ this.showDropdown }>
          <TextLine mostLeft mostRight>
            { this.state.contentType }
          </TextLine>
          <ExpandIcon />
        </SelectButton>
        <DropdownMenu isOpen={ this.state.isOpen }>
          {
            list.map(this.renderDataDropDown)
          }
        </DropdownMenu>
      </Wrapper>
    )
  }
}

Select.propTypes = {
  list: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]))
}

Select.defaultProps = {
  list: []
}

export default Select
