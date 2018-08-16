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
    marginLeft: '15px',
    marginRight: '15px',
    fontSize: FONT_SIZE.smallx
  },
  form: {
    marginLeft: '15px',
    marginRight: '15px',
    marginBottom: '30px'
  },
  row: {
    display: 'flex',
    marginBottom: '15px',
    flexDirection: 'column'
  },
  label: {
    marginRight: 'auto',
    marginBottom: '5px'
  },
  desc: {
    marginTop: '5px',
    fontSize: FONT_SIZE.smallx
  }
})
