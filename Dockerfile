FROM node:14-alpine as development

WORKDIR /var/www/app

COPY package*.json yarn.lock ./

RUN apk add --no-cache make gcc g++ python3

COPY . .
RUN yarn --pure-lockfile
RUN yarn add bcrypt
COPY env/local.env .env

CMD ["yarn", "start:dev"]