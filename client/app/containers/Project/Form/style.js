import prefix from 'helpers/vendor-prefix'
import { FONT_SIZE } from 'styles/constants'

export default prefix({
  wrapper: {
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
