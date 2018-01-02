import prefix from 'helpers/vendor-prefix'
import { COLOR } from 'styles/constants'
import { fontStyle } from 'styles/global'

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
    backgroundColor: 'transparent'
  }
})

export const content = prefix({
  wrapper: {
    flexGrow: 1,
    textAlign: 'right'
  },
  heading: {
    color: COLOR.dark,
    fontSize: '18px',
    fontWeight: 900,
    lineHeight: '35px',
    marginTop: '10px',
    display: 'block'
  },
  item: {
    color: COLOR.darkGray,
    fontSize: '18px',
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
    fontSize: '16px',
    fontWeight: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '5px'
  }
})
