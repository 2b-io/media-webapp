export default {
  findAccountById: (state, id, currentSession) => {
    if (id !== 'me' || !currentSession) {
      return state[ id ]
    }

    const { account: { _id } } = currentSession

    return state[ _id ]
  }
}
