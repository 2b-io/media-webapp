export default {
  findAccountById: (state, id, currentSession) => {
    if (id !== 'me' || !currentSession) {
      return state.accounts[ id ]
    }

    const { account: { _id } } = currentSession

    return state.accounts[ _id ]
  }
}
