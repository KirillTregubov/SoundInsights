# syntax=docker/dockerfile:1

FROM node:18-alpine

ARG workdir=

WORKDIR ${workdir}

ENV PATH=${workdir}/node_modules/.bin:$PATH
ENV NODE_ENV=development
ENV NPM_CONFIG_PRODUCTION=false
ENV YARN_PRODUCTION=false

COPY package.json .
COPY yarn.lock .

RUN yarn

CMD ["yarn", "dev", "--host", "0.0.0.0"]
