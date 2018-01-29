import prefix from 'helpers/vendor-prefix'
import linkStyle from 'components/Link/style'
import { FONT_SIZE } from 'styles/constants'
import { modalLayout } from 'styles/layout'

export default prefix({
  ...modalLayout,
  desc: {
    fontSize: FONT_SIZE.small,
    marginBottom: '30px',
    textAlign: 'center'
  },
  control: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmButton: {
    marginLeft: '15px',
    marginRight: '15px',
    marginBottom: '5px'
  },
  cancelButton: {
    ...linkStyle,
    whiteSpace: 'nowrap',
    display: 'inline-block',
    fontSize: FONT_SIZE.smallx
  }
})
