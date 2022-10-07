# syntax=docker/dockerfile:1

FROM node:18

ARG workdir=

WORKDIR ${workdir}

# COPY package.json ./
# COPY package-lock.json ./

ENV NODE_ENV=development
ENV NPM_CONFIG_PRODUCTION=false
ENV YARN_PRODUCTION=false

COPY package.json .
COPY yarn.lock .

RUN yarn

CMD ["yarn", "dev", "--host", "0.0.0.0"]

# CMD sleep infinity
