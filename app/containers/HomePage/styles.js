import color from 'color';

export default {
  container: {
    padding: '10px',
    display: 'flex',
    transition: 'all .2s',
    ':hover': {
      background: color('#0074d9').lighten(0.2)
    },
  }
};
