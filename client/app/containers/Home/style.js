import prefix from 'helpers/vendor-prefix'
import { COLOR } from 'styles/constants'
import logoBg from 'img/black_cloud.svg'

import buttonStyle from 'components/Button/style'

export default prefix({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '100px'
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
    ...buttonStyle,
    marginTop: '20px'
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
