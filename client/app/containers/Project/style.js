import prefix from 'helpers/vendor-prefix'
import linkStyle from 'components/Link/style'
import { COLOR, FONT_SIZE } from 'styles/constants'
import { fontStyle } from 'styles/global'
import { columnLayout } from 'styles/layout'

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
  overlay: {
    zIndex: 302,
    position: 'fixed',
    background: COLOR.light.fade(.2),
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  wrapper: {
    ...fontStyle,
    zIndex: 302,
    position: 'fixed',
    marginLeft: 'auto',
    marginRight: 'auto',
    top: '100px',
    maxWidth: '900px',
    width: '100%',
    display: 'inline-block',
    left: 0,
    right: 0
  },
  content: {
    marginLeft: '15px',
    marginRight: '15px',
    flex: 1,
    padding: '15px',
    border: `2px solid ${COLOR.darkGray}`,
    background: COLOR.light,
  },
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
