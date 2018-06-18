# media-on-demand-webapp
A web app that allows tenants register and configure their MediaNetwork CDN presets.

## prerequisite
Install [docker](https://docs.docker.com/install/) and [docker compose](https://docs.docker.com/compose/install/) on your development environment.

## clone
```
$ cd /path/to/your/project
/path/to/your/project$ git clone git@github.com:media-network/media-infra.git infra
/path/to/your/project$ cd infra
/path/to/your/project/infra$ chmod +x start.sh

$ cd /path/to/your/project
/path/to/your/project$ git clone git@github.com:media-network/media-webapp.git webapp
```

## run
```
$ cd /path/to/your/project/infra
/path/to/your/project/infra$ ./start.sh

$ cd /path/to/your/project/webapp
/path/to/your/project/webapp$ docker-compose up -d
/path/to/your/project/webapp$ docker exec -it media.webapp bash

/usr/src$ npm install & npm install:all
/usr/src$ npm start
```
