import React from 'react'
import styled from 'styled-components'

import { ErrorIcon } from 'ui/icons'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${
    ({ theme: { spacing } }) => `${ spacing.tiny } ${ spacing.small }`
  };
  margin-bottom: ${
    ({ theme }) => theme.spacing.medium
  };
  background: ${
    ({ theme }) => theme.error.base
  };
  color: ${
    ({ theme }) => theme.error.on.base
  };
`

const Icon = styled.div`
  display: inline-flex;
  margin-right: ${
    ({ theme }) => theme.spacing.small
  };
  flex-grow: 0;
  white-space: nowrap;
`

const Message = styled.div`
  display: inline-flex;
  flex-grow: 1;
`

const ErrorBox = ({ children }) => (
  <Wrapper>
    <Icon>
      <ErrorIcon size="large" />
    </Icon>
    <Message>
      { children }
    </Message>
  </Wrapper>
)

export default ErrorBox
