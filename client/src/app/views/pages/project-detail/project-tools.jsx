import React from 'react'
import styled from 'styled-components'

const Pattern = styled.div`
  cursor: pointer;
  padding: ${
    ({ theme }) => `
      ${ theme.spacing.small }
      ${ theme.spacing.medium }
    `
  }
`

const CacheInvalidator = ({ onPresetSelected, detail,  }) => (
  <Pattern
    onClick={ () => onPresetSelected() }
  >
    <span>{ detail }</span>
  </Pattern>
)

export default CacheInvalidator
