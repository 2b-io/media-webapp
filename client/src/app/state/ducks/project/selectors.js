export default {
  allProjects: state => Object.values(state.projects || {}),
  findProjectByIdentifier: (state, identifier) => state.projects[ identifier ]
}
