import React, { Component } from 'react'
import styled from 'styled-components'

import { AssistiveTextLine } from 'ui/typo'

const Container = styled.div`
  position: relative;
  background: ${ ({ theme }) => theme.white.base };
  color: ${ ({ theme }) => theme.white.on.base };
`

const InputArea = styled.textarea.attrs({
  rows: ({ rows = 1 }) => rows
})`
  display: block;
  width: 100%;
  appearance: none;
  border: none;
  border-radius: none;
  outline: none;
  line-height: 24px;
  padding: 8px;
  resize: none;
  overflow-wrap: break-word;
  background: ${
    ({ theme }) => theme.white.base
  };
  color: ${
    ({ disabled, theme }) => disabled ? '#e6e6e6' : theme.black.base
  };
  cursor: ${
    ({ disabled, readOnly }) => (disabled || readOnly) ? 'not-allowed' : 'inherit'
  };

  &::placeholder {
    color: ${ ({ theme }) => theme.secondary.limpid.base };
  }

  /*
  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0,0,0,0);
  }
  */
`

const Wrapper = styled.div`
  position: relative;
`

const Indicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: ${
    ({ disabled, theme }) => disabled ? '#e6e6e6' : theme.black.base
  };
`

const Assistive = styled.div`
  display: grid;
  & > * {
    min-height: 0;
    min-width: 0;
  }
  grid-template-columns: 1fr min-content;
`

class TextArea extends Component {
  constructor(...args) {
    super(...args)

    this.autoGrow = this.autoGrow.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.autoGrow()
    }, 100)

    window.addEventListener('resize', this.autoGrow)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.autoGrow)
  }

  autoGrow() {
    if (!this._input) {
      return
    }

    this._input.style.height = 0
    this._input.style.height = `${ this._input.scrollHeight }px`
  }

  render() {
    const {
      disabled,
      invalid,
      valid,
      ...props
    } = this.props

    return (
      <Wrapper>
        <Container>
          <InputArea
            disabled={ disabled }
            valid={ valid }
            invalid={ invalid }
            { ...props }
            innerRef={ e => this._input = e }
            onInput={ this.autoGrow() }
          />
          <Indicator disabled={ disabled } />
        </Container>
        <Assistive>
          { props.readOnly &&
            <AssistiveTextLine mostLeft mostRight>
              Read only
            </AssistiveTextLine> ||
            <AssistiveTextLine mostLeft mostRight variant="error">
              { invalid }
            </AssistiveTextLine>
          }
          { props.maxLength &&
            <AssistiveTextLine mostLeft mostRight>
              { props.value.length }/{ props.maxLength }
            </AssistiveTextLine>
          }
        </Assistive>
      </Wrapper>
    )
  }
}

export default TextArea
