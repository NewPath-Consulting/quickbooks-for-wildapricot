
ARG NODE_VERSION=20.8.0

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

COPY package-lock.json .
COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

# Run the application.
CMD ["npm", "run", "dev"]
