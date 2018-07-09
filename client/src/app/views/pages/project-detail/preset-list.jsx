import React from 'react'

const PresetList = ({ presets }) => (
  <ul>
    {
      presets.map(
        preset => (
          <li key={ preset.hash }>{ preset.name }</li>
        )
      )
    }
  </ul>
)

export default PresetList
