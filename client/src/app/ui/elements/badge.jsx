import React from 'react'
import styled from 'styled-components'

import { AssistiveTextLine } from 'ui/typo'

const Wrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${ ({ theme }) => theme.primary.base };
  color: ${ ({ theme }) => theme.primary.on.base };
`

const Badge = ({ content }) => (
  <Wrapper>
    <Content>
      <AssistiveTextLine align="center">{ content }</AssistiveTextLine>
    </Content>
  </Wrapper>
)

export default Badge
