import color from 'color'
import prefix from 'helpers/vendor-prefix'
import { fontStyle } from 'styles/global'
import { cardLayout } from 'styles/layout'

export default prefix({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '100px'
  },
  signIn: {
    flex: 1,
    minWidth: '300px',
    margin: '0 30px 30px'
  },
  promoteSignUp: {
    flex: 1,
    minWidth: '300px',
    margin: '0 30px'
  }
})

export const form = {
  row: prefix({
    display: 'flex',
    margin: '0 0 15px',
    alignItems: 'center'
  }),
  signIn: {
  },
  forgot: {
    fontSize: '12px',
    marginLeft: '15px'
  }
}
