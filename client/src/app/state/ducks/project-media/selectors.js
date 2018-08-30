export default {
  listMedia: state => {
    const listMedia = (state.projectMedia && state.projectMedia.length>0) ? state.projectMedia : []

    return listMedia.map(
      media => {
        const path = media.path
        const typeIndex = path.lastIndexOf('.')
        const croppedImg = path.slice(0, typeIndex) + '/default/crop_200x100' + path.slice(typeIndex)

        return ({ ...media, croppedImg })
      }
    )
  }
}
