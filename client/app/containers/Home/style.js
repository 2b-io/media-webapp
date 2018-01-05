import prefix from 'helpers/vendor-prefix'
import { COLOR, FONT_SIZE } from 'styles/constants'
import { columnLayout } from 'styles/layout'
import logoBg from 'img/black_cloud.svg'

import buttonStyle from 'components/Button/style'

export default prefix({
  wrapper: {
    ...columnLayout.wrapper,
    maxWidth: '900px'
  },
  about: {
    ...columnLayout.column,
    minWidth: '300px'
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
    animation: 'animatedLogo 10s linear infinite'
  },
  heading: {
    fontSize: FONT_SIZE.heading,
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
    fontSize: FONT_SIZE.large,
    lineHeight: '27px',
    marginTop: '40px',
    fontWeight: 200
  },
  features: {
    ...columnLayout.column,
    minWidth: '300px',
    marginTop: '80px'
  },
  featuresList: {
  },
  feature: {
    margin: '30px 0',
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
