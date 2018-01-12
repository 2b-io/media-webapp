import { COLOR, FONT_SIZE } from 'styles/constants'

export const columnLayout = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  column: {
    flex: 1,
    marginLeft: '15px',
    marginRight: '15px',
    marginBottom: '15px'
  }
}

export const appLayout = {
  wrapper: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  content: {
    flexGrow: 1
  }
}

export const widgetLayout = {
  wrapper: {
    // borderLeft: `2px solid ${COLOR.lightGray}`,
    // padding: '15px'
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
  }
}
