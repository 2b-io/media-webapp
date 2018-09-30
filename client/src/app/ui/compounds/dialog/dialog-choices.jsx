import styled from 'styled-components'

const Choices = styled.div`
  padding: ${
    ({ theme }) => `0 ${ theme.spacing.small }`
  };
  display: flex;
  justify-content: flex-end;
`
export default Choices
