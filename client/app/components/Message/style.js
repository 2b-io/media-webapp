import prefix from 'helpers/vendor-prefix'
import { COLOR, FONT_SIZE } from 'styles/constants'
import { fontStyle } from 'styles/global'

const wrapper = {
  ...fontStyle,
  maxWidth: '900px',
  marginLeft: 'auto',
  marginRight: 'auto',
}

const content = {
  display: 'flex',
  alignItems: 'center',
  margin: '0 30px 30px',
  padding: '5px 0 5px 15px',
  transition: 'border .2s',
  position: 'relative',
  ':hover': {
    borderLeft: `5px solid ${COLOR.dark}`,
  },
}

const autoDismiss = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  height: '2px',
  width: '100%'
}

const message = {
  flex: 1,
  marginLeft: '5px',
  fontSize: FONT_SIZE.small,
  cursor: 'pointer'
}

const icon = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
}

export default prefix({
  error: {
    content: {
      ...content,
      borderLeft: `5px solid ${COLOR.darkGray}`
    },
    autoDismiss: {
      ...autoDismiss,
      background: COLOR.darkGray,
    },
    wrapper,
    message,
    icon,
  },
  info: {
    content: {
      ...content,
      borderLeft: `5px solid ${COLOR.lightGray}`
    },
    autoDismiss: {
      ...autoDismiss,
      background: COLOR.lightGray,
    },
    wrapper,
    message,
    icon
  }
})
