import prefix from 'helpers/vendor-prefix'
import { COLOR, FONT_SIZE } from 'styles/constants'
import { modalLayout } from 'styles/layout'

export default prefix({
  ...modalLayout,
  code: {
    fontFamily: 'monospace',
    fontSize: FONT_SIZE.smallxx,
    background: COLOR.lightGray,
    padding: '15px',
    marginBottom: '5px',
    display: 'block',
    overflow: 'auto'
  },
  desc: {
    marginTop: '5px',
    fontSize: FONT_SIZE.smallx
  }
})
