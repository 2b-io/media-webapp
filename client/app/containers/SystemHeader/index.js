import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'
import { MorphReplace } from 'react-svg-morph'

// icons
import IconClose from 'react-icons/lib/md/chevron-right'
import IconDashboard from 'react-icons/lib/md/dashboard'
import IconHome from 'react-icons/lib/md/home'
import IconMenu from 'react-icons/lib/md/menu'


// internal
import { toggleSystemDrawer } from 'actions/drawer'
import { redirect } from 'actions/location'
import { COLOR } from 'styles/constants'

// local
import style from './style'

@connect(state => {
  const menu = state.burgerMenu['layout/SYSTEM']
  const { pathname } = state.ui.location

  return {
    pathname,
    showMenu: menu ? menu.isOpen : false,
    signedIn: !!(state.app.session && state.app.session.verified)
  }
})
@Radium
class SystemHeader extends React.Component {
  constructor(props) {
    super(props)

    this._openSystemMenu = this._openSystemMenu.bind(this)
    this._redirect = this._redirect.bind(this)
  }

  render() {
    const { showMenu } = this.props

    return (
      <nav style={style.wrapper}>
        {this._renderHomeButton()}
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

  _renderHomeButton() {
    const { pathname, signedIn } = this.props

    if (pathname === '/dashboard' || (!signedIn && pathname !== '/')) {
      return (
        <figure style={style.logoIcon} onClick={this._redirect('/')}>
          <IconHome size={24} />
        </figure>
      )
    }

    if (signedIn) {
      return (
        <figure style={style.logoIcon} onClick={this._redirect('/dashboard')}>
          <IconDashboard size={24} />
        </figure>
      )
    }

    return null
  }

  _openSystemMenu(showMenu) {
    const { dispatch } = this.props

    return () => dispatch(toggleSystemDrawer(showMenu))
  }

  _redirect(pathname) {
    const { dispatch } = this.props

    return () => dispatch(redirect(pathname))
  }
}

export default SystemHeader
