import prefix from 'helpers/vendor-prefix'
import { COLOR } from 'styles/constants'

export default prefix({
  wrapper: {
    borderTop: `1px solid ${COLOR.lightGray}`,
    minHeight: '50px',
    position: 'relative',
    marginTop: '40px',
    clear: 'both',
    padding: '5px 15px',
    display: 'flex',
    alignItems: 'center'
  },
  menuWrapper: {
    display: 'flex',
    marginLeft: 'auto',
    flexWrap: 'wrap'
  },
  menu: {
    whiteSpace: 'nowrap',
    marginLeft: 'auto',
    lineHeight: '24px'
  },
  itemWrapper: {
    display: 'inline-block',
    marginLeft: '30px',
  },
  item: {
    color: COLOR.darkGray
  },
  logoWrapper: {
    margin: '0 auto 0 0',
    borderRadius: '100%',
    border: `2px solid ${COLOR.dark}`,
    width: '32px',
    minWidth: '32px',
    height: '32px',
    minHeight: '32px'
  }
})
