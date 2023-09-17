FROM node:16.17.0-bullseye-slim AS build-stage

# use nginx port 8080
ENV REACT_APP_BACKEND_URL=//localhost:8080

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:1.20-alpine
# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
