import prefix from 'helpers/vendor-prefix'
import linkStyle from 'components/Link/style'
import { COLOR, FONT_SIZE } from 'styles/constants'
import { columnLayout, modalLayout } from 'styles/layout'

export default prefix({
  wrapper: {
    ...columnLayout.wrapper,
    maxWidth: '900px'
  },
  project: {
    marginLeft: '15px',
    marginRight: '15px',
    marginBottom: '15px'
  },
  usage: {
    marginLeft: '15px',
    marginRight: '15px',
    marginBottom: '30px',
    display: 'block'
  },
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
  },
  other: {
    marginLeft: '15px',
    marginRight: '15px',
    marginBottom: '30px'
  },
  toggleDisable: {
    marginRight: '15px',
    marginBottom: '5px'
  },
  delete: {
    ...linkStyle,
    fontSize: FONT_SIZE.smallx,
    display: 'inline-block',
    whiteSpace: 'nowrap'
  }
})

export const form = prefix({
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

export const modal = prefix({
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
