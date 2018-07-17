import React from 'react'
import styled, { css } from 'styled-components'

import { SuccessIcon } from 'ui/icons'

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
    ({ theme }) => theme.success.base
  };
  color: ${
    ({ theme }) => theme.success.on.base
  };

  ${
    ({ interactable }) => interactable && css`
      cursor: pointer;

      &:hover {
        background: ${
          ({ theme }) => theme.success.light.base
        };
        color: ${
          ({ theme }) => theme.success.light.on.base
        };
      }

      &:active {
        background: ${
          ({ theme }) => theme.success.dark.base
        };
        color: ${
          ({ theme }) => theme.success.dark.on.base
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

const SuccessBox = ({ children, interactable }) => (
  <Wrapper interactable={ interactable }>
    <Icon>
      <SuccessIcon size="large" />
    </Icon>
    <Message>
      { children }
    </Message>
  </Wrapper>
)

export default SuccessBox
