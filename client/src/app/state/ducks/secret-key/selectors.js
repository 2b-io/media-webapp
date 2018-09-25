export default {
  findSecretKey: (state, identifier, key) => {
    if (!state[ identifier ]) {
      return {}
    }
    return state[ identifier ][ key ]
  },
  secretKeys: (state, identifier) => {
    return state[ identifier ]
  }
}
