export default {
  projectCount: state => Object.keys(state).length,
  allProjects: state => Object.values(state || {}),
  findProjectByIdentifier: (state, identifier) => state[ identifier ]
}
