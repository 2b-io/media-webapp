import React from 'react'
import { Switch as StaticSwitch } from 'react-router'
import { AnimatedSwitch } from 'react-router-transition'

const mapStyles = styles => ({
  opacity: styles.opacity,
  ...(
    styles.left !== undefined ? {
      transform: `translateX(${ styles.left }%)`
    } : {}
  ),
  ...(
    styles.top !== undefined ? {
      transform: `translateY(${ styles.top }px)`
    } : {}
  )
})

const effects = {
  slide: {
    atEnter: { opacity: 0, left: -10 },
    atLeave: { opacity: 0, left: 10 },
    atActive: { opacity: 1, left: 0 }
  },
  fade: {
    atEnter: { opacity: 0 },
    atLeave: { opacity: 0 },
    atActive: { opacity: 1 }
  }
}

const Switch = ({ animated, children }) => {
  if (!animated) {
    return <StaticSwitch>{ children }</StaticSwitch>
  }

  return (
    <AnimatedSwitch
      className="switch-wrapper"
      { ...effects[animated] }
      mapStyles={ mapStyles }
      runOnMount={ false }>
      { children }
    </AnimatedSwitch>
  )
}

export default Switch
