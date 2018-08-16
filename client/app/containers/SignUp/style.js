import prefix from 'helpers/vendor-prefix'
import { columnLayout } from 'styles/layout'

export default prefix({
  wrapper: {
    ...columnLayout.wrapper,
    maxWidth: '900px'
  },
  signUp: {
    ...columnLayout.column
  }
})

export const form = prefix({
  row: {
    display: 'flex',
    margin: '0 0 15px',
    alignItems: 'center'
  },
})
