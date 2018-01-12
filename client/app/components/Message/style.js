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
  margin: '0 15px 15px',
  padding: '15px 5px',
  transition: 'border .2s',
  position: 'relative'
}

const autoDismiss = {
  position: 'absolute',
  left: 0,
  bottom: '-1px',
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
  cursor: 'pointer',
  marginLeft: '5px',
  marginRight: '5px'
}

export default prefix({
  error: {
    content: {
      ...content,
      border: `1px solid ${COLOR.darkGray}`
    },
    autoDismiss: {
      ...autoDismiss,
      background: COLOR.dark,
    },
    wrapper,
    message,
    icon,
  },
  info: {
    content: {
      ...content,
      border: `1px solid ${COLOR.lightGray}`
    },
    autoDismiss: {
      ...autoDismiss,
      background: COLOR.darkGray,
    },
    wrapper,
    message,
    icon
  }
})
