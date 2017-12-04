import { action } from 'redux-burger-menu'

export function toggleMenu(isOpen) {
  return action(isOpen)
}
