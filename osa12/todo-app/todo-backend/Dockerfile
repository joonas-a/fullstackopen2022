FROM node:16.17.0-bullseye-slim

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm ci --only=production

USER node
CMD npm start
