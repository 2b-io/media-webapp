import React from 'react'
import styled, { css } from 'styled-components'

import { InfoIcon } from 'ui/icons'

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
    ({ theme }) => theme.info.base
  };
  color: ${
    ({ theme }) => theme.info.on.base
  };

  ${
    ({ interactable }) => interactable && css`
      cursor: pointer;

      &:hover {
        background: ${
          ({ theme }) => theme.info.light.base
        };
        color: ${
          ({ theme }) => theme.info.light.on.base
        };
      }

      &:active {
        background: ${
          ({ theme }) => theme.info.dark.base
        };
        color: ${
          ({ theme }) => theme.info.dark.on.base
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

const InfoBox = ({ children, interactable }) => (
  <Wrapper interactable={ interactable }>
    <Icon>
      <InfoIcon size="large" />
    </Icon>
    <Message>
      { children }
    </Message>
  </Wrapper>
)

export default InfoBox
