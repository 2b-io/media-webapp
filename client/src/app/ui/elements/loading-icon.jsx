import React from 'react'
import Spinkit from 'react-spinkit'
import styled from 'styled-components'

const Surface = styled.div`
  display: flex;
  top: 256px;
  left: 50%;
  position: absolute;
  margin: 0 auto;
  width: 40px;
  height: 40px;
  max-width: 100%;
  max-height: 100%;
  justify-content: center;
  align-items: center;
  color: ${
    ({ theme }) => theme.primary.base
  };
`

const iconLoading = () => {
  return (
    <Surface>
      <Spinkit name="rotating-plane" color='inherit'/>
      &nbsp;
      <p>Loading...</p>
    </Surface>
  )
}

export default iconLoading
