import prefix from 'helpers/vendor-prefix'
import { columnLayout } from 'styles/layout'

export default prefix({
  wrapper: {
    ...columnLayout.wrapper,
    maxWidth: '900px'
  },
  widget: {
    width: '100%',
    marginLeft: '30px',
    marginRight: '30px',
    marginBottom: '30px'
  }
})
