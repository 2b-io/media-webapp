import prefix from 'helpers/vendor-prefix'

export default prefix({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '100px'
  },
  signUp: {
    flex: 1,
    minWidth: '300px',
    margin: '0 30px'
  }
})

export const form = prefix({
  row: {
    display: 'flex',
    margin: '0 0 15px',
    alignItems: 'center'
  },
})
