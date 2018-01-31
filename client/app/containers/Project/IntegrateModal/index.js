import React from 'react'
import IconClose from 'react-icons/lib/md/close'

import modal from 'decorators/Modal'

import style from './style'

@modal('integrate')
class IntegrateModal extends React.Component {
  render() {
    const { onOverlayClick, modalData:{ preset, project } } = this.props

    return [
      <div key="overlay"
        style={style.overlay}
        onClick={onOverlayClick}>
      </div>,
      <div key="modal" style={style.wrapper}>
        <div style={style.content}>
          <div style={style.header}>
            <div onClick={onOverlayClick}>
              <IconClose size={16} />
            </div>
          </div>
          <label>Change your code</label>
          <code style={style.code}>
            {this._originCode()}
          </code>
          <label>To</label>
          <code style={style.code}>
            {this._integrateCode(project, preset)}
          </code>
          <p style={style.desc}>
            Please note that <b>YOUR_PUBLIC_IMAGE_URL</b> should be a full URL of your public image. It should contain protocol and domain.<br />
            For example: <b>https://yourdomain.com/your_image.jpg</b>
          </p>
        </div>
      </div>
    ]
  }

  _originCode() {
    const src = 'YOUR_PUBLIC_IMAGE_URL'

    return this._highlight`<img src="${src}" />`
  }

  _integrateCode(project, preset) {
    const slug = project.slug
    const hash = preset.hash
    const width = 'YOUR_DESIRED_WIDTH'
    const url = 'YOUR_PUBLIC_IMAGE_URL'

    return hash === 'default' ?
      this._highlight`<img src="https://server1.mn-cdn.com/p/${slug}/media?width=${width}&url=${url} />` :
      this._highlight`<img src="https://server1.mn-cdn.com/p/${slug}/${hash}/media?width=${width}&url=${url} />`
  }

  _highlight(strings, ...values) {
    return strings.reduce((children, s, index) => [
      ...children,
      <span key={`s${index}`}>{s}</span>,
      values[index] ? <b key={`v${index}`}>{values[index]}</b> : null
    ], [])
  }
}

export default IntegrateModal
