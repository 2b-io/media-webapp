import prefix from 'helpers/vendor-prefix'
import { FONT_SIZE } from 'styles/constants'
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
  },
  signUpQuestion: {
    marginBottom: '15px'
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
    fontSize: FONT_SIZE.smallx,
    marginLeft: '15px'
  }
})
