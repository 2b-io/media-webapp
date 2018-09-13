export default {
  allProjects: state => Object.values(state.projects || {}),
  findProjectByIdentifier: (state, identifier) => state.projects[ identifier ],
  findPreset: (state, { hash, slug }) => {
    const project = state.projects[ slug ]

    if (!project) {
      return null
    }

    return project.presets[ hash ]
  }
}
