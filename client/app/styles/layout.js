import color from 'color'
import prefix from 'helpers/prefix'

export const cardLayout = prefix({
  wrapper: {
  },
  content: {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '.25rem',
    padding: '2rem 2rem 1rem'
  }
})

export const appLayout = prefix({
  wrapper: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  header: {

  },
  footer: {

  },
  content: {
    flexGrow: 1
  }
})
