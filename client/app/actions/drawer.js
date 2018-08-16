import { action } from 'redux-burger-menu'

import { LAYOUT } from 'actions/layout'

export function togglePersonalDrawer(isOpen) {
  return action(isOpen, LAYOUT.PERSONAL_MODE)
}

export function toggleSystemDrawer(isOpen) {
  return action(isOpen, LAYOUT.SYSTEM_MODE)
}
