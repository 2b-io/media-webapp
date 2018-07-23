import styled from 'styled-components'

const Line = styled.div`
  position: relative;
  padding-top: ${
    ({ theme }) => theme.spacing.small
  };

  padding-bottom: ${
    ({ last = false, theme }) => last ? 0 : `${ theme.spacing.medium }`
  };
`
export default  Line
