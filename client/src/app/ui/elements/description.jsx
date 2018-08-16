import styled from 'styled-components'

const Description = styled.p`
  text-align: ${
    ({ justify }) => justify && 'justify'
   };
  font-size: : 14px;
  padding-bottom: 15px;
`
export default Description
