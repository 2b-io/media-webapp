import React from 'react'
import MediaQuery from 'react-responsive'

const BREAK_POINT_DEFS = {
  // by device
  desktop: '(min-width: 1025px)',
  tablet: '(min-width: 768px) and (max-width: 1024px)',
  phone: '(max-width: 767px)',
  // progressive
  small: '(max-width: 767px)',
  medium: '(min-width: 768px)',
  large: '(min-width: 1025px)'
}

const BreakPoint = ({ children, name }) => {
  const desiredBreakPoint = BREAK_POINT_DEFS[name] || BREAK_POINT_DEFS.desktop

  return (
    <MediaQuery query={ desiredBreakPoint }>
      { children }
    </MediaQuery>
  )
}

export default BreakPoint
