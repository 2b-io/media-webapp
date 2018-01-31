import React from 'react'

import IconAdd from 'react-icons/lib/md/add'
import IconCode from 'react-icons/lib/md/code'

import style from './style'

class Preset extends React.Component {
  render() {
    const { preset, onClick, onShowCodeClick } = this.props

    return (
      <div style={style.presetWrapper}>
        <div style={style.preset}>
          <span
            style={style.presetName}
            onClick={onClick}>{preset.name}</span>
          <div style={style.toggleCode}
            onClick={onShowCodeClick}>
            <IconCode size={16} />
          </div>
        </div>
      </div>
    )
  }
}

class PresetList extends React.Component {
  render() {
    const { project, onClick } = this.props

    if (!project._id) return null

    return (
      <div style={style.wrapper}>
        <div style={style.header}>
          <div style={style.title}>Presets</div>
          <div style={style.controls}>
            <div style={style.button} onClick={this._onClick()}>
              <IconAdd size={16} />
            </div>
          </div>
        </div>
        <div style={style.content}>
          {this._renderPresetList(project.presets)}
        </div>
        <p style={style.desc}>Click to each preset to modify its settings</p>
      </div>
    )
  }

  _renderPresetList(presets = []) {
    return (
      <ul>
        { Object.values(presets).map(preset => {
          return (
            <li key={preset.hash}>
              <Preset preset={preset}
                onClick={this._onClick(preset)}
                onShowCodeClick={this._onShowCodeClick(preset)}
              />
            </li>
          )
        }) }
      </ul>
    )
  }

  _onShowCodeClick(preset) {
    const { onShowCodeClick } = this.props

    return () => {
      if (!onShowCodeClick) return

      onShowCodeClick(preset)
    }
  }

  _onClick(preset) {
    const { onClick } = this.props

    return () => {
      if (!onClick) return

      onClick(preset)
    }
  }
}

export default PresetList
