import styled from 'styled-components'

const Content = styled.div`
  padding: ${
    ({ theme }) => `${ theme.spacing.medium } ${ theme.spacing.small }`
  };
`
export default Content
