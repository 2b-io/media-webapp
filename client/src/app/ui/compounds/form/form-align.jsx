
import styled from 'styled-components'

const Align = styled.div`
  text-align: ${
    ({ center,justify,right }) => (
      center? 'center' : justify? 'justify' : right? 'right' :'unset'
    )
  };
`
export default  Align
