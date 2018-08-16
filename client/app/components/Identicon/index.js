import md5 from 'md5'
import React from 'react'

class Identicon extends React.PureComponent {
  render() {
    const { id, size } = this.props
    const src = `//www.gravatar.com/avatar/${md5(id)}?d=identicon&f=y&s=${size}`

    return (
      <img src={src} width={size} height={size} />
    )
  }
}

export default Identicon
