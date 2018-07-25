import styled from 'styled-components'

const Panel = styled.div`
  box-shadow: 0 5px 20px ${
    ({ theme }) => theme.secondary.opaque.base
  };
`

Panel.Header = styled.div`
  background: ${
    ({ theme }) => theme.primary.base
  };
  color: ${
    ({ theme }) => theme.primary.on.base
  };
`

Panel.Content = styled.div`
  background: ${
    ({ theme }) => theme.background.base
  };
  color: ${
    ({ theme }) => theme.background.on.base
  };
`

export default Panel
