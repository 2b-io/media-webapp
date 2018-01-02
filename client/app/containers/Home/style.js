import prefix from 'helpers/vendor-prefix'
import { COLOR } from 'styles/constants'
import logoBg from 'img/black_cloud.svg'

export default prefix({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '200px'
  },
  about: {
    flex: 1,
    minWidth: '300px',
    margin: '0 30px'
  },
  homeHead: {
    width: '120px',
    height: '120px',
    border: `2px solid ${COLOR.dark}`,
    borderRadius: '100px',
    overflow: 'hidden'
  },
  homeHeadAnimation: {
    width: '240px',
    height: '75px',
    marginLeft: '-60px',
    marginTop: '45px',
    backgroundImage: `url(${logoBg})`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'auto 75px',
    animation: 'animatedLogo 30s linear infinite'
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
    margin: '80px 30px 0 30px'
  },
  featuresList: {
  },
  feature: {
    margin: '30px 0',
    fontSize: '18px',
    lineHeight: '25px'
  },
  featureName: {
    fontWeight: 700,
    marginBottom: '5px',
    display: 'block'
  },
  featureDesc: {
    color: COLOR.darkGray
  }
})
