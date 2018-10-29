const positiveNumberRegex  = /^(\d*\.)?\d+$/i

const positiveNumber = (value) =>
  value && !positiveNumberRegex.test(value) ?
    'Invalid positive number' : undefined

export default positiveNumber
