import prefix from 'helpers/vendor-prefix'
import { columnLayout } from 'styles/layout'

export default prefix({
  wrapper: {
    ...columnLayout.wrapper,
    maxWidth: '900px'
  },
  signIn: {
    ...columnLayout.column,
    minWidth: '300px',
  },
  promoteSignUp: {
    ...columnLayout.column,
    minWidth: '300px'
  }
})

export const form = prefix({
  row: {
    display: 'flex',
    margin: '0 0 15px',
    alignItems: 'center'
  },
  signIn: {},
  forgot: {
    fontSize: '14px',
    marginLeft: '15px'
  }
})
