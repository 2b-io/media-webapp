export default {
  getPreset: (state, identifier, contentType ) => {

    const project = state.project
    console.log('project');
    if (!project) {
      return null
    }
    console.log('project.presets[ contentType ]', project.presets[ contentType ])
    return project.presets[ contentType ]
  }
}
