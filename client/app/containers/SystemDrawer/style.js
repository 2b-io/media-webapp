import prefix from 'helpers/vendor-prefix'
import { COLOR, FONT_SIZE } from 'styles/constants'
import { fontStyle } from 'styles/global'
import linkStyle from 'components/Link/style'

export const sideMenuStyle = prefix({
  bmMenu: {
    ...fontStyle,
    background: COLOR.light,
    borderLeft: `1px solid ${COLOR.lightGray}`,
    paddingTop: '60px',
    paddingLeft: '10px',
    paddingRight: '15px'
  },
  bmItemList: {
    display: 'flex',
    flexDirection: 'column'
  },
  bmOverlay: {
    backgroundColor: COLOR.light.fade(.2)
  }
})

export const content = prefix({
  wrapper: {
    flexGrow: 1,
    textAlign: 'right'
  },
  heading: {
    color: COLOR.dark,
    fontWeight: 900,
    lineHeight: '35px',
    marginTop: '10px',
    display: 'block'
  },
  item: {
    ...linkStyle,
    color: COLOR.darkGray,
    fontWeight: 300,
    lineHeight: '35px',
    display: 'block'
  }
})

export const bottom = prefix({
  wrapper: {
    textAlign: 'right'
  },
  signature: {
    color: COLOR.darkGray,
    fontSize: FONT_SIZE.small,
    fontWeight: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '50px'
  }
})
