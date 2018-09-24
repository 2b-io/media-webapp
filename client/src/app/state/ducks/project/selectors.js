export default {
  allProjects: state => Object.values(state || {}),
  findProjectByIdentifier: (state, identifier) => state[ identifier ]
}
