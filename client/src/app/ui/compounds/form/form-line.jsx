import styled from 'styled-components'

const Line = styled.div`
  padding-bottom: ${
    ({ last = false, theme }) => last ? 0 : `${ theme.spacing.medium }`
  };
`
export default  Line
