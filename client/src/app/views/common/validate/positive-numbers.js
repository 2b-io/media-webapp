const positiveNumbers = value =>
  value && !/^(\d*\.)?\d+$/i.test(value) ?
    'Invalid positive numbers' : undefined

export default positiveNumbers
