export default {
  findSecretKey: (state, identifier, key) => {
    if (!state[ identifier ]) {
      return
    }
    return state[ identifier ][ key ]
  },
  SecretKeys: (state, identifier) => {
    return state[ identifier ]
  }
}
