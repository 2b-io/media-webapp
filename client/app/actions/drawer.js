import { action } from 'redux-burger-menu'

export function toggleAccountMenu(isOpen) {
  return action(isOpen, 'account')
}

export function toggleSystemMenu(isOpen) {
  return action(isOpen, 'system')
}
