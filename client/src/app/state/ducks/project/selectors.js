export default {
  allProjects: state => Object.values(state.projects || {}),
  findProjectBySlug: (state, slug) => state.projects[ slug ]
}
