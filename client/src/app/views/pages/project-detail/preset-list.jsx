import React from 'react'

const PresetList = ({ presets, toPresetDetail }) => (
  <ul>
    {
      Object.values(presets).map(
        (preset, index) => (
          !preset.removed && <li
            onClick={ () => toPresetDetail(preset.hash) }
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
