import React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { List } from 'ui/elements'
import { AddIcon } from 'ui/icons'
import { DescriptionText, TextLine } from 'ui/typo'


const Wrapper = styled.div`
  position: relative;
`

const SelectButton = styled.div`
  width: 100%;
  display: grid;
  & > * {
    min-width: 0;
    min-height: 0;
  };
  grid-template-columns: 1fr 40px;
  white-space: nowrap;
  cursor: pointer;
  border-bottom: 2px solid black;
`

const DropdownMenu = styled.ul.attrs({
  style: ({ isOpen }) => {
    console.log(isOpen);
    return ({
      display: `${ isOpen ? 'block' : 'none' }`
    })}
})`
  position: absolute;
  top: 36px;
  left: 0;
  right: 4px;
  z-index: 1000;
  display: none;
  background-color: white;
  border: 1px solid green;
`

const Item = styled.li`
  cursor: pointer;
  &:hover,
  &:active {
    background: #ddd;
  }
`

class Selection extends React.Component {

  static defaultProps = {
    list: []
  };

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
      this.setState({ labelItem: label })
    } else {
      this.checkType(true)
      this.setState({ labelItem: this.props.list[0] })
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
    if (this.state.labelItem !== value) {
      this.setState({
        labelItem: value
      })
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
        <TextLine mostLeft mostRight>{ label }</TextLine>
      </Item>
    )
  }

  render () {
    const { list } = this.props
    console.log(this.state)
    return (
      <Wrapper>
        <SelectButton
          name="labelItem"
          onClick={ this.showDropdown }>
          <TextLine mostLeft mostRight>
            { this.state.labelItem }
          </TextLine>
          <AddIcon />
        </SelectButton>
        <DropdownMenu isOpen={ this.state.isOpen }>
          { list.map(this.renderDataDropDown) }
        </DropdownMenu>
      </Wrapper>
    )
  }
}

export default Selection
