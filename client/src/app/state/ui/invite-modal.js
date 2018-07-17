export default {
  component: 'modal/InviteCollaborator',
  reducer: (state = { results: [ '1@abc.com' ] }, action) => {
    console.log(state, action)

    return state
  }
}
