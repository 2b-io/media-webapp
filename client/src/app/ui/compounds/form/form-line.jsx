import styled from 'styled-components'

const Line = styled.div`
  padding-bottom: ${
    ({ last = false }) => last ? 0 : '20px'
  };
`
export default  Line
