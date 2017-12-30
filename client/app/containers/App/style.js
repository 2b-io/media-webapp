import color from 'color'
import prefix from 'helpers/vendor-prefix'
import { COLOR } from 'styles/constants'
import { appLayout } from 'styles/layout'
import { fontStyle } from 'styles/global'

export const footerStyle = prefix({
  wrapper: {
    ...fontStyle,
    paddingTop: '40px'
  },
  links: {
    background: color('#ffffff'),
    padding: '20px 4vw 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  linkSection: {
    padding: '20px 0 10px',
    minWidth: '200px'
  },
  linkSectionItems: {
    lineHeight: '25px'
  },
  linkSessionHeading: {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    display: 'block',
    borderBottom: `1px solid ${color('#717274')}`,
    marginBottom: '.75rem'
  },
  link: {
    fontSize: '.82rem',
    color: color('#717274')
  },
  note: {
    height: '54px',
    borderTop: `1px solid ${color('#ffffff').fade(0.4)}`,
    display: 'flex',
    alignItems: 'center',
    padding: '0 4vw'
  },
  right: {
    marginLeft: 'auto'
  },
  contactUs: {
    color: color('#717274'),
    fontSize: '.82rem',
    display: 'inline-block'
  },
  contactItem: {
    marginLeft: '.7rem',
    display: 'inline-block'
  }
})

export const bodyStyle = prefix({
  height: '100%'
})

export const containerStyle = prefix({
  ...appLayout.content,
  background: COLOR.light,
  marginTop: '130px',
  paddingLeft: '15px',
  paddingRight: '15px'
})

export const wrapperStyle = prefix({
  ...fontStyle,
  ...appLayout.wrapper,
  position: 'relative'
})
