import React from 'react'
import styled from 'styled-components'

import { Trash } from 'ui/icons'
import { Button } from 'ui/elements'
import { TextBox } from 'views/common/form'
import { Form } from 'ui/compounds'

const HeaderLine = styled.div`
  display: flex;
  align-items: center;
`
const StyledTextBox = styled.div`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const StyledButton = styled.div`
  flex-grow: 0;
  padding:  ${
    ({ theme }) => `0 ${ theme.spacing.small }`
  };
`
const FormItem = styled.div`
  border-bottom: 1px solid ${
    ({ theme }) => theme.secondary.opaque.base
  };
  margin-bottom: ${ ({ theme }) => theme.spacing.tiny };
`

const CustomHeader = ({ idle, handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <FormItem>
      <Form.Line>
        <HeaderLine>
          <StyledTextBox>
            <TextBox
              label="Header Name"
              type="text"
              name="headerName"
              placeholder="Header Name"
            />
          </StyledTextBox>
          <StyledButton>
            <Button plain size="medium" >
              <Trash size="medium" />
            </Button>
          </StyledButton>
        </HeaderLine>
      </Form.Line>
      <Form.Line>
        <TextBox
          label="Value"
          type="text"
          name="Value"
          placeholder="Value"
        />
      </Form.Line>
    </FormItem>
    <Form.Line last>
      <Button
        variant="primary"
        type="submit"
        disabled={ !idle }
      >Save all</Button>
    </Form.Line>
  </Form>
)

export default CustomHeader
