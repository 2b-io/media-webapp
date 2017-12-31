import prefix from 'helpers/vendor-prefix'
import { COLOR } from 'styles/constants'

export default prefix({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '200px 30px 0 30px'
  },
  about: {
    flex: 1,
    minWidth: '300px'
  },
  homeHead: {
    width: '120px',
    height: '120px',
    border: `2px solid ${COLOR.dark}`,
    borderRadius: '100px'
  },
  heading: {
    fontSize: '34px',
    lineHeight: '48px',
    fontWeight: 400,
    color: COLOR.dark,
    maxWidth: '400px',
    marginTop: '30px'
  },
  signUp: {
    ':hover': {
      color: COLOR.light,
      background: COLOR.dark
    },
    color: COLOR.dark,
    background: COLOR.light,
    marginTop: '20px',
    paddingLeft: '30px',
    paddingRight: '30px',
    border: `2px solid ${COLOR.dark}`,
    borderRadius: '20px',
    fontSize: '18px',
    display: 'inline-block',
    height: '40px',
    lineHeight: '34px',
    transition: 'color .2s, background .2s'
  },
  description: {
    fontSize: '20px',
    lineHeight: '27px',
    marginTop: '40px',
    fontWeight: 200
  },
  features: {
    flex: 1,
    minWidth: '300px',
    marginTop: '80px'
  }
})
