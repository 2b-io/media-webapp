import md5 from 'md5'
import React from 'react'

const src = (id, size) => `//www.gravatar.com/avatar/${md5(id)}?d=identicon&f=y&s=${size}`

const Identicon = ({ id, size }) => (
  <img src={ src(id, size) } width={ size } height={ size } />
)

export default Identicon
