import React from 'react'
import { FieldArray } from 'redux-form'
import styled from 'styled-components'

import { TrashIcon } from 'ui/icons'
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
const WrapperButton = styled.div`
  flex-grow: 0;

  padding:  ${
    ({ theme }) => `0 ${ theme.spacing.small }`
  };
`
const StyledButton = styled.div`
  padding-top: ${ ({ theme }) => theme.spacing.small };
  padding-bottom: ${ ({ theme }) => theme.spacing.medium };
`
const StyledIcon = styled.div`
  padding:  ${ ({ theme }) => theme.spacing.small };
`
const FormItem = styled.div`
  border-bottom: 1px solid ${
    ({ theme }) => theme.secondary.opaque.base
  };
  margin-bottom: ${ ({ theme }) => theme.spacing.tiny };
`

const CustomHeader = ({ idle, handleSubmit, headers }) => (
  <Form handleSubmit={ handleSubmit }>
    <FieldArray
      name="headers"
      component={
        ({ fields }) => (
          fields.length ?
            fields.map(
              (header, index) => (
                <FormItem key={ index }>
                  <Form.Line>
                    <HeaderLine>
                      <StyledTextBox>
                        <TextBox
                          label="Header Name"
                          type="text"
                          name={ `${ header }.name` }
                          placeholder="Header Name"
                        />
                      </StyledTextBox>
                      <WrapperButton>
                        <StyledButton>
                          <Button plain size="medium" >
                            <TrashIcon size="medium" />
                          </Button>
                        </StyledButton>
                      </WrapperButton>
                    </HeaderLine>
                  </Form.Line>
                  <Form.Line>
                    <TextBox
                      label="Value"
                      type="text"
                      name={ `${ header }.value` }
                      placeholder="Value"
                    />
                  </Form.Line>
                </FormItem>
              )
            ) :
            <p>No data</p>
        )
      }
    />
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
