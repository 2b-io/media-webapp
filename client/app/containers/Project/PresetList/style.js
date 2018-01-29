import prefix from 'helpers/vendor-prefix'
import linkStyle from 'components/Link/style'
import { COLOR, FONT_SIZE } from 'styles/constants'

export default prefix({
  wrapper: {
    marginLeft: '15px',
    marginRight: '15px',
    marginBottom: '30px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '5px',
    borderBottom: `1px solid ${COLOR.lightGray}`
  },
  controls: {
    marginLeft: 'auto'
  },
  button: {
    display: 'inline-block',
    marginLeft: '5px',
    cursor: 'pointer'
  },
  title: {
    color: COLOR.darkGray,
    fontWeight: 700
  },
  content: {
    marginTop: '15px',
    fontSize: FONT_SIZE.smallx
  },
  presetWrapper: {
    paddingBottom: '5px'
  },
  preset: {
    display: 'flex',
    alignItems: 'center'
  },
  presetName: {
    ...linkStyle
  },
  toggleCode: {
    marginLeft: 'auto'
  }
})
