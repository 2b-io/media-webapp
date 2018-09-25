import React from 'react'
import styled from 'styled-components'

const Status = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StatusColor = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${
    ({ isActive }) => isActive ? '#97d077' : '#e6e6e6'
  };
  transition: background .3s;
`

const StatusIndicator = ({ isActive }) => (
  <Status>
    <StatusColor isActive={ isActive } />
  </Status>
)

export default StatusIndicator
