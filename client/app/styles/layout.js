import { COLOR } from 'styles/constants'

export const columnLayout = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  column: {
    flex: 1,
    marginLeft: '30px',
    marginRight: '30px',
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
    flexGrow: 1,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}

export const widgetLayout = {
  wrapper: {
    border: `2px solid ${COLOR.lightGray}`,
    padding: '15px'
  },
  header: {
    display: 'flex',
    alignItems: 'center'
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
    fontSize: '14px'
  }
}
