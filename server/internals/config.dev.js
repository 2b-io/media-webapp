module.exports = {
  systemPort: 3003,
  webpackDevServer: 'http://0.0.0.0:3001',
  mongodb: 'mongodb://mongo/myapp',
  session: {
    secret: 'mysupersecret',
    ttl: '1h'
  }
}
