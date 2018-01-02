import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'
import { MorphReplace } from 'react-svg-morph'

// icons
import IconBack from 'react-icons/lib/md/arrow-back'
import IconMenu from 'react-icons/lib/md/menu'
import IconClose from 'react-icons/lib/md/chevron-right'

// internal
import { toggleSystemDrawer } from 'actions/drawer'
import { back } from 'actions/location'
import { COLOR } from 'styles/constants'

// local
import style from './style'

@connect(state => {
  const menu = state.burgerMenu['layout/SYSTEM']
  const { pathname } = state.ui.location

  return {
    showMenu: menu ? menu.isOpen : false,
    pathname
  }
})
@Radium
class SystemHeader extends React.Component {
  constructor(props) {
    super(props)

    this._openSystemMenu = this._openSystemMenu.bind(this)
  }

  render() {
    const { showMenu, pathname } = this.props

    return (
      <nav style={style.wrapper}>
        <figure style={style.logoIcon} onClick={this._back(pathname)}>
          {this._renderBackButton(pathname)}
        </figure>
        <figure style={style.menuIcon} onClick={this._openSystemMenu(!showMenu)}>
          <MorphReplace width={24} height={24} fill={COLOR.light.string()} duration={200}>
            { showMenu ?
              <IconClose key="IconClose" /> :
              <IconMenu key="IconMenu" />
            }
          </MorphReplace>
        </figure>
      </nav>
    )
  }

  _renderBackButton(pathname) {
    if (pathname === '/') return null

    return <IconBack size={24} />
  }

  _openSystemMenu(showMenu) {
    const { dispatch } = this.props

    return () => dispatch(toggleSystemDrawer(showMenu))
  }

  _back(pathname) {
    if (pathname === '/') return () => {}

    return () => history.back()
  }
}

export default SystemHeader
