import prefix from 'helpers/vendor-prefix'
import { COLOR } from 'styles/constants'
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
    fontSize: '12px'
  }
})
