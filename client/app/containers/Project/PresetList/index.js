import Radium from 'radium'
import React from 'react'

import IconAdd from 'react-icons/lib/md/add'

import style from './style'

class Preset extends React.Component {
  render() {
    const { preset } = this.props

    return (
      <div>{preset.name}</div>
    )
  }
}

@Radium
class PresetList extends React.Component {
  render() {
    const { project } = this.props

    if (!project._id) return null

    return (
      <div style={style.wrapper}>
        <div style={style.header}>
          <div style={style.title}>Presets</div>
          <div style={style.controls}>
            <div style={style.button}>
              <IconAdd size={16} />
            </div>
          </div>
        </div>
        <div style={style.content}>
          {this._renderPresetList(project.presets)}
        </div>
      </div>
    )
  }

  _renderPresetList(presets = []) {
    return (
      <ul>
        {presets.map(preset => {
          return (
            <li key={preset._id}>
              <Preset preset={preset} />
            </li>
          )
        })}
      </ul>
    )
  }
}

export default PresetList
