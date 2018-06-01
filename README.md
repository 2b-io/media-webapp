# media-on-demand-webapp
A web app that allows tenants register and configure their MediaNetwork CDN presets.

# Infras
```
$ git clone git@github.com:media-network/media-infra.git
$ ./start.sh
```

# Development
```
$ docker-compose up -d
$ docker exec -it media.webapp bash
$ npm install
$ npm run install:all
$ npm start
```
