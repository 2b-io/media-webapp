export default {
  pinnedProjects: (state, pinnedProjectIdentifiers) => {
    if (Object.keys(state).length) {
      return Object.values(state).filter((project) =>
        pinnedProjectIdentifiers.some((pinnedProject) =>
          pinnedProject.identifier === project.identifier
        )
      )
    } else {
      return []
    }
  },
  projectCount: state => Object.keys(state).length,
  allProjects: state => Object.values(state || {}),
  findProjectByIdentifier: (state, identifier) => state[ identifier ]
}
