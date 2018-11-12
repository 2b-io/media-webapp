export default {
  pinnedProjects: (state, pinnedProjectIdentifiers) => {
    if (Object.keys(state).length && pinnedProjectIdentifiers) {
      return Object.values(state).filter((project) =>
        Object.values(pinnedProjectIdentifiers).some((pinnedProject) =>
          pinnedProject.identifier === project.identifier
        )
      ).map((_project) => {
        const { bytesDownloaded, requests } = pinnedProjectIdentifiers[ _project.identifier ]
        return { ..._project, bytesDownloaded, requests }
      })
    } else {
      return []
    }
  },
  projectCount: state => Object.keys(state).length,
  allProjects: state => Object.values(state || {}),
  findProjectByIdentifier: (state, identifier) => state[ identifier ]
}
