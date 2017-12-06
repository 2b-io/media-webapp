import color from 'color'
import { fontStyle } from 'styles/global'

export default {
  wrapper: {
    ':hover': {
      background: color('#e8e8e8')
    },
    ...fontStyle,
    padding: '1rem 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer'
  },
  accountAvatar: {
    margin: '0 1rem 0 1.5rem'
  },
  accountInfo: {
    flexGrow: 1
  },
  signedIn: {
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    color: color('#717274'),
    letterSpacing: '.5px',
    marginBottom: 0,
    fontWeight: 400
  },
  accountName: {
    display: 'block',
    maxWidth: '175px',
    overflow: 'hidden',
    fontWeight: 700,
    marginTop: '-5px',
    marginBottom: '-4px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
}
