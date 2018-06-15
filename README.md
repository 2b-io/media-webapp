# media-on-demand-webapp
A web app that allows tenants register and configure their MediaNetwork CDN presets.
# first  install--------------------
# cd to project Infras
```
$ git clone git@github.com:media-network/media-infra.git
$ ./start.sh
```

# cd to project Development
```
$ docker-compose up -d
$ docker exec -it media.webapp bash
$ npm install
$ npm run install:all
$ npm start
```
# Run----------------
# cd to project Infras
```
$ docker-compose up -d
```
# cd to project Webapp
```
$ docker-compose up -d
$ docker exec -it media.webapp bash
$ npm start
```
