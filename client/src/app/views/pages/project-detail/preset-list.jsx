import React from 'react'

const PresetList = ({ presets, onPresetSelected }) => (
  <ul>
    {
      Object.values(presets).map(
        (preset, index) => (
          <li
            onClick={ () => onPresetSelected(preset.hash) }
            key={ index }
          >
            { preset.name }
          </li>
        )
      )
    }
  </ul>
)

export default PresetList
