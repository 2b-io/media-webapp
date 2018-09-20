import React from 'react'
import styled from 'styled-components'

import { List } from 'ui/compounds'

const SmallValue = styled.span`
  font-size: 0.7em;
`

const PresetList = ({ presets, onPresetSelected }) => (
  <List>
    {
      Object.values(presets).map(
        (preset, index) => (
          <List.Item
            onClick={ () => onPresetSelected(preset.hash) }
            key={ index }
          >
            <p>{ preset.name }</p>
            {/* <SmallValue>Value: { preset.values.quality } </SmallValue> */}
          </List.Item>
        )
      )
    }
  </List>
)

export default PresetList
