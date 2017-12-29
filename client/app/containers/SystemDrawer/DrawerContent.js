import Radium from 'radium'
import React from 'react'

import { content as style } from './style'
import { InternalLink } from 'components/Link'

@Radium
class DrawerContent extends React.Component {
  render() {
    return (
      <ul style={style.wrapper}>
        <li>
          <InternalLink link="/" style={style.heading}>
           MediaOnDemand
          </InternalLink>
        </li>
        <li>
          <InternalLink link="/" style={style.item}>
            <span>about</span>
          </InternalLink>
        </li>
        <li>
          <InternalLink link="/" style={style.item}>
            <span>help</span>
          </InternalLink>
        </li>
        <li>
          <InternalLink link="/sign-up" style={style.item}>
            <span>sign up</span>
          </InternalLink>
        </li>
        <li>
          <InternalLink link="/sign-in" style={style.item}>
            <span>sign in</span>
          </InternalLink>
        </li>
      </ul>
    )
  }
}

export default DrawerContent
