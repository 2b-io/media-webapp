import prefix from 'helpers/vendor-prefix'
import { FONT_SIZE } from 'styles/constants'
import { widgetLayout as layout } from 'styles/layout'

export default prefix({
  ...layout,
  project: {
    paddingBottom: '5px',
    marginBottom: '5px'
  },
  projectName: {

  },
  projectOrigins: {
    fontSize: FONT_SIZE.smallxx
  }
})
