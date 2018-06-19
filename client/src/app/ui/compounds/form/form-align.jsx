
import styled from 'styled-components'

const Align = styled.div`
  text-align: ${
    ({ center,justify,right }) => {
      return center? 'center' : 'unset'
      return justify? 'justify' : 'unset'
      return right? 'right' : 'unset'
    }
  };
`
export default  Align
