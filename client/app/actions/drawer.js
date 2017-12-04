import { action } from 'redux-burger-menu'

export function toggleAppMenu(isOpen) {
  return action(isOpen, 'app')
}
