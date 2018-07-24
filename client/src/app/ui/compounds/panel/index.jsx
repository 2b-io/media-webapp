import styled from 'styled-components'

const Panel = styled.div`
  box-shadow: 0 0 20px ${
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
`

export default Panel
