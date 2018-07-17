import React from 'react'
import styled, { css } from 'styled-components'

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

  ${
    ({ interactable }) => interactable && css`
      cursor: pointer;

      &:hover {
        background: ${
          ({ theme }) => theme.error.light.base
        };
        color: ${
          ({ theme }) => theme.error.light.on.base
        };
      }

      &:active {
        background: ${
          ({ theme }) => theme.error.dark.base
        };
        color: ${
          ({ theme }) => theme.error.dark.on.base
        };
      }
    `
  }
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

const ErrorBox = ({ children, interactable }) => (
  <Wrapper interactable={ interactable }>
    <Icon>
      <ErrorIcon size="large" />
    </Icon>
    <Message>
      { children }
    </Message>
  </Wrapper>
)

export default ErrorBox
