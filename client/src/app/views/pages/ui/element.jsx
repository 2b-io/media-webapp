import React from 'react'
import styled from 'styled-components'

import { AddIcon } from 'ui/icons'
import { Button, ErrorBox, TextArea, TextBox } from 'ui/elements'

const Wrapper = styled.section`
`

const Box = styled.div`
  flex-basis: 50%;
  padding: ${ ({ theme }) => theme.spacing.tiny };
`

const Sep = styled.span`
  margin-right: ${ ({ theme }) => theme.spacing.medium };
  height: 1px;
`

const ElementSection = () => (
  <Wrapper>
    <Box>
      <ErrorBox>Error message here!</ErrorBox>
    </Box>
    <Box>
      <TextBox defaultValue="Normal TextBox" />
      <TextBox defaultValue="Disabled TextBox" disabled />
      <TextBox defaultValue="Readonly TextBox" readOnly />
      <TextBox placeholder="Enter your things here" />
    </Box>
    <Box>
      <TextArea defaultValue="Normal TextArea" />
      <TextArea defaultValue="Disabled TextArea" disabled />
    </Box>
    <Box>
      <Button><AddIcon /><Sep />Click me, a button!</Button><Sep />
      <Button plain>Plain button!</Button><Sep />
      <Button plain>
        <AddIcon />
      </Button><Sep />
    </Box>
    <Box>
      <Button.Group>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
        <Button>5</Button>
      </Button.Group>
    </Box>
  </Wrapper>
)

export default ElementSection
