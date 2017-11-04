import color from 'color'

export default {
  container: Object.assign({
    padding: '10px',
    display: 'flex',
    transition: 'all .2s',
    ':hover': {
      background: color('#0074d9').fade(0.2)
    },
  }, {
    padding: '20px',
    margin: '15px'
  })
}
