import React from 'react'
import styled from 'styled-components'

const FormLine = styled.div`
  padding-bottom: ${
    ({ last = false }) => last ? 0 : '20px'
  };
`
export default FormLine
