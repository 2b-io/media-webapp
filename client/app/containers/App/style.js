import prefix from 'helpers/vendor-prefix'
import { COLOR } from 'styles/constants'
import { appLayout } from 'styles/layout'
import { fontStyle } from 'styles/global'

export default prefix({
  wrapper: {
    ...fontStyle,
    ...appLayout.wrapper,
    position: 'relative',
    flex: 1
  },
  content: {
    ...appLayout.content,
    background: COLOR.light,
    marginTop: '100px'
  }
})
