FROM node:16.17.0-bullseye-slim

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]
