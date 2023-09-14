FROM node:16 AS build-stage

ENV REACT_APP_BACKEND_URL=//localhost:3001

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm test

RUN npm run build

FROM nginx:1.20-alpine
# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

# Build: docker build -t "name" .
# Run: docker run -p 8000:80 "name"