const checkCondition = ({ condition, base, value }) => {
  switch (condition) {
    case '>':
      return value > base
  }

  return true
}

const ConditionalDisplay = ({ children, ...props }) => {
  const passed = checkCondition(props)

  return passed ? children : null
}

export default ConditionalDisplay
