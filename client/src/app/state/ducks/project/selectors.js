export default {
  allProjects: state => Object.values(state.projects || {}),
  findProjectBySlug: (state, slug) => state.projects[ slug ],
  findPresetByHash: (state, slug, hash) => state.projects[ slug ].presets[ hash ],
  collaborators: state => state.collaborators,
  emailCollaborator: state => state.emailCollaborator
}
