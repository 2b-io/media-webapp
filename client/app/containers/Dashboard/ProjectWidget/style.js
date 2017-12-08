import color from 'color'
import prefix from 'helpers/vendor-prefix'

export default prefix({
  wrapper: {
    marginBottom: '1rem'
  },
  heading: {
    fontSize: '1.75rem',
    fontWeight: 700,
    lineHeight: '2rem',
    letterSpacing: '-1px',
    margin: '0 0 1rem'
  },
  list: {
    padding: '1rem .8rem',
    background: color('#ffffff'),
    border: `1px solid ${color('#e8e8e8')}`,
    borderRadius: '.25rem',
    boxShadow: `0 1px 0 ${color('#000000').alpha(0.25)}`,
    margin: '0 auto 3rem'
  }
})
