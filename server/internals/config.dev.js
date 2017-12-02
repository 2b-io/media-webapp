module.exports = {
  systemPort: 3000,
  webpackDevServer: 'http://0.0.0.0:3001',
  mongodb: 'mongodb://localhost/myapp',
  session: {
    secret: 'mysupersecret',
    ttl: '1h'
  }
}
