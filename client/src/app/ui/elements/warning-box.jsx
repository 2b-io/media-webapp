import React from 'react'
import styled, { css } from 'styled-components'

import { WarningIcon } from 'ui/icons'

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
    ({ theme }) => theme.warning.base
  };
  color: ${
    ({ theme }) => theme.warning.on.base
  };

  ${
    ({ interactable }) => interactable && css`
      cursor: pointer;

      &:hover {
        background: ${
          ({ theme }) => theme.warning.light.base
        };
        color: ${
          ({ theme }) => theme.warning.light.on.base
        };
      }

      &:active {
        background: ${
          ({ theme }) => theme.warning.dark.base
        };
        color: ${
          ({ theme }) => theme.warning.dark.on.base
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

const WarnBox = ({ children, interactable }) => (
  <Wrapper interactable={ interactable }>
    <Icon>
      <WarningIcon size="large" />
    </Icon>
    <Message>
      { children }
    </Message>
  </Wrapper>
)

export default WarnBox
