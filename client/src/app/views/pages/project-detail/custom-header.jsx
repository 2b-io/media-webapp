import React from 'react'
import { FieldArray } from 'redux-form'
import styled from 'styled-components'

import { AddIcon, TrashIcon } from 'ui/icons'
import { Button, Container } from 'ui/elements'
import { TextBox } from 'views/common/form'
import { Form, Panel, TitleBar } from 'ui/compounds'

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
const FormItem = styled.div`
  border-bottom: 1px solid ${
    ({ theme }) => theme.secondary.opaque.base
  };
  margin-bottom: ${ ({ theme }) => theme.spacing.tiny };
`

const CustomHeaderFormItems = ({ fields, idle }) => (
  <div>
    {
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
                    <Button
                      plain
                      size="medium"
                      onClick={ () => fields.remove(index) }
                    >
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
      )
    }
    <Form.Line last>
      <Button
        variant="primary"
        type="submit"
        disabled={ !idle }
      >Save all</Button>
    </Form.Line>
  </div>
)

const CustomHeaderForm = ({ fields, idle }) => (
  <Panel >
    <Panel.Header>
      <TitleBar>
        <TitleBar.Title>
          <h2>Custom Headers</h2>
        </TitleBar.Title>
        <TitleBar.Menu>
          <Button plain onClick={ () => fields.push({ }) }>
            <AddIcon size="medium" />
          </Button>
        </TitleBar.Menu>
      </TitleBar>
    </Panel.Header>
    <Panel.Content>
      <Container >
        {
          fields.length ?
            <CustomHeaderFormItems
              fields={ fields }
              idle={ idle }
            /> :
            <p>No data</p>
        }

      </Container>
    </Panel.Content>
  </Panel>
)

const CustomHeader = ({ handleSubmit }) => (
  <Form handleSubmit={ handleSubmit }>
    <FieldArray
      name="headers"
      component={ CustomHeaderForm }
    />
  </Form>
)

export default CustomHeader
