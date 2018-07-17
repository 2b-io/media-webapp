import React from 'react'
import styled, { css } from 'styled-components'

import { CircularCountdown } from 'ui/elements'
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  white-space: nowrap;
  width: 32px;
  height: 32px;
  margin-right: ${
    ({ theme }) => theme.spacing.small
  };
`

const Message = styled.div`
  display: inline-flex;
  flex-grow: 1;
`

const Countdown = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`

const WarningBox = ({ children, expiring, interactable }) => (
  <Wrapper interactable={ interactable }>
    <Icon>
      <WarningIcon size="medium" />
      { expiring &&
        <Countdown>
          <CircularCountdown
            expiring={ expiring }
            size={ 32 }
          />
        </Countdown>
      }
    </Icon>
    <Message>
      { children }
    </Message>
  </Wrapper>
)

export default WarningBox
