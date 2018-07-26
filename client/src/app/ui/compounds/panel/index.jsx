import styled, { css } from 'styled-components'

const Panel = styled.div`
  box-shadow: 0 5px 20px ${
    ({ theme }) => theme.secondary.opaque.base
  };
  display: flex;
  flex-direction: column;
  ${
    ({ fit }) => fit && css`
      height: 100%;
      max-height: 100%;
    `
  }
`

Panel.Header = styled.div`
  background: ${
    ({ theme }) => theme.primary.base
  };
  color: ${
    ({ theme }) => theme.primary.on.base
  };
  flex-grow: 0;
`

Panel.Content = styled.div`
  background: ${
    ({ theme }) => theme.background.base
  };
  color: ${
    ({ theme }) => theme.background.on.base
  };
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
`

Panel.Footer = styled.div`
  background: ${
    ({ theme }) => theme.background.base
  };
  color: ${
    ({ theme }) => theme.background.on.base
  };
  padding: ${
    ({ theme }) => `
      ${ theme.spacing.small }
      ${ theme.spacing.medium }
    `
  };
  flex-grow: 0;
`

export default Panel
