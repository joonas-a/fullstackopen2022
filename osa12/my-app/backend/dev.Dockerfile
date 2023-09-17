FROM node:16.17.0-bullseye-slim

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app/

CMD ["npm", "run", "dev"]