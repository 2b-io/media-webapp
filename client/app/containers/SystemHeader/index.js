import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'

// icons
import IconMenu from 'react-icons/lib/md/menu'
import IconClose from 'react-icons/lib/md/close'

// internal
import { toggleSystemDrawer } from 'actions/drawer'
import { COLOR } from 'styles/constants'

// local
import style from './style'

@connect(state => {
  const menu = state.burgerMenu['layout/SYSTEM']

  return {
    showMenu: menu ? menu.isOpen : false
  }
})
@Radium
class SystemHeader extends React.Component {
  constructor(props) {
    super(props)

    this._openSystemMenu = this._openSystemMenu.bind(this)
  }

  render() {
    const { showMenu } = this.props

    return (
      <nav style={style.wrapper}>
        <figure style={style.menuIcon}
          onClick={this._openSystemMenu(!showMenu)}>
          { showMenu ?
            <IconClose size={24} color={COLOR.light.string()} /> :
            <IconMenu size={24} color={COLOR.light.string()} />
          }
        </figure>
      </nav>
    )
  }

  _openSystemMenu(showMenu) {
    const { dispatch } = this.props

    return () => dispatch(toggleSystemDrawer(showMenu))
  }
}

export default SystemHeader
