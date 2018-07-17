export default {
  allProjects: state => Object.values(state.projects || {}),
  findProjectBySlug: (state, slug) => state.projects[ slug ],
  findPreset: (state, { hash, slug }) => {
    const project = state.projects[ slug ]

    if (!project) {
      return null
    }

    return project.presets[ hash ]
  }
}
