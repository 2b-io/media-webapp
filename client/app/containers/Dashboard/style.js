import prefix from 'helpers/vendor-prefix'
import { columnLayout } from 'styles/layout'

export default prefix({
  wrapper: {
    ...columnLayout.wrapper
  },
  widget: {
    ...columnLayout.column,
    minWidth: '300px'
  }
})
