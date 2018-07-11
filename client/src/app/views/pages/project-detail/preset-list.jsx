import React from 'react'

const PresetList = ({ presets, toPresetDetail }) => (
  <ul>
    {
      presets.map(
        preset => (
          <li
            onClick={ ()=> toPresetDetail(preset.hash) }
            key={ preset.hash }
          >
            { preset.name }
          </li>
        )
      )
    }
  </ul>
)

export default PresetList
