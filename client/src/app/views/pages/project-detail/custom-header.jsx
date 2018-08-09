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
const TrashButton = styled.div`
  padding-top: ${ ({ theme }) => theme.spacing.small };
  padding-bottom: ${ ({ theme }) => theme.spacing.medium };
`
const FormItem = styled.div`
  border-bottom: 1px solid ${
    ({ theme }) => theme.secondary.opaque.base
  };
  margin-bottom: ${ ({ theme }) => theme.spacing.tiny };
`

const WrapperHeader = styled.div`
  flex-grow: 0;
`

const CustomHeaderFormItems = ({ fields }) => (
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
              <TrashButton>
                <Button
                  plain
                  size="medium"
                  onClick={ () => fields.remove(index) }
                >
                  <TrashIcon size="medium" />
                </Button>
              </TrashButton>
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
)

const CustomHeaderForm = ({ fields }) => (
  <Panel >
    <WrapperHeader>
      <TitleBar>
        <TitleBar.Title>
          <h3>Custom Headers</h3>
        </TitleBar.Title>
        <TitleBar.Menu>
          <Button plain onClick={ () => fields.push({ }) }>
            <AddIcon size="medium" />
          </Button>
        </TitleBar.Menu>
      </TitleBar>
    </WrapperHeader>
    <Panel.Content>
      <Container >
        {
          fields.length ?
            <CustomHeaderFormItems
              fields={ fields }
            /> :
            <p>No data</p>
        }
      </Container>
    </Panel.Content>
  </Panel>
)

const CustomHeader = () => (
  <FieldArray
    name="headers"
    component={ CustomHeaderForm }
  />
)

export default CustomHeader
