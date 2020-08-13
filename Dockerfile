FROM node:lts-buster

WORKDIR /app

COPY ./index.js ./

COPY ./package*.json ./

RUN npm ci

ENTRYPOINT ["npm", "start"]